const { Op } = require('sequelize');
const frmtr = require('../helpers/frmtr');
const capitalize = require('../helpers/capitalize')

// ! Ownership: the user always comes from the verified JWT (req.user, set by the auth middleware), never from the request query, body or params

const isId = (value) => /^\d+$/.test(String(value));

// Lookup restricted to the user's own rows: another user's record behaves exactly like a missing one (404)
const findOwned = (Model, id, userId, options = {}) => Model.findOne({
    where: { [Model.primaryKeyAttribute]: parseInt(id), userId },
    ...options,
});

// Many-to-many ids come from the client: every linked record must exist and belong to the same user
const resolveAssociationIds = async (Model, body, toSetAssociations, userId) => {
    const resolved = {};

    for (const assoc of toSetAssociations) {
        if (!Array.isArray(body[assoc])) continue;

        const association = Model.associations?.[assoc];
        if (!association) {
            console.warn(`Association ${assoc} not found on ${Model.name}`);
            continue;
        }

        if (!body[assoc].every(isId))
            return { error: `Invalid ids provided for ${assoc}` };

        const ids = [...new Set(body[assoc].map(id => parseInt(id)))];
        if (ids.length) {
            const { target } = association;
            const ownedCount = await target.count({ where: { [target.primaryKeyAttribute]: ids, userId } });
            if (ownedCount !== ids.length)
                return { error: `Invalid ids provided for ${assoc}` };
        }

        resolved[assoc] = ids;
    }

    return { resolved };
};

// ? Example: if resolved includes "musics", then item.setMusics(resolved.musics) is called
const applyAssociations = async (Model, item, resolved) => {
    for (const [assoc, ids] of Object.entries(resolved)) {
        const setter = `set${capitalize(assoc)}`;
        if (typeof item[setter] === 'function') {
            await item[setter](ids);
        } else {
            console.warn(`Association setter ${setter} not found on ${Model.name}`);
        }
    }
};

const getAll = (Model, { searchFields = [], defaultSort = [], associations = [] } = {}) => async (req, res) => {
    const { userId } = req.user;
    let { sort, page, perPage, search } = req.query;

    // Use provided sort or default sort options
    const order = (sort ? sort : defaultSort).map(param => [param.orderBy, param.order]);

    // Build where clause
    let where = { userId };
    if (search && searchFields.length) {
        where[Op.or] = searchFields.map(field => ({
            [field]: { [Op.like]: `%${search}%` }
        }));
    }

    // Pagination setup
    const totalCount = await Model.count({ where });
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(perPage) || 10;
    const offset = (pageNumber - 1) * limit;
    const pagination = {
        page: pageNumber,
        perPage: limit,
        total: Math.ceil(totalCount / limit)
    };

    // Query, including associations if any
    const items = await Model.findAll({ where, order, offset, limit, include: associations });
    res.status(200).json(frmtr('success', items, null, pagination));
};

const getById = (Model, { associations = [] } = {}) => async (req, res) => {
    if (!req.params.id)
        return res.status(400).json(frmtr('error', null, 'No id provided'));

    if (!isId(req.params.id))
        return res.status(400).json(frmtr('error', null, 'Invalid id provided'));

    const item = await findOwned(Model, req.params.id, req.user.userId, { include: associations });
    if (!item)
        return res.status(404).json(frmtr('error', null, `No ${Model.name} found with this id`));

    res.status(200).json(frmtr('success', item));
};

const create = (Model, { requiredFields = [], toSetAssociations = [] } = {}) => async (req, res) => {
    const { userId } = req.user;

    // Check for missing required fields
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length)
        return res.status(400).json(frmtr('error', null, `Missing fields: ${missingFields.join(', ')}`));

    // Validated before the insert, so a rejected link never leaves a half-created record
    const { resolved, error } = await resolveAssociationIds(Model, req.body, toSetAssociations, userId);
    if (error)
        return res.status(400).json(frmtr('error', null, error));

    // Clone request body so we can remove linked associations keys, the owner is always the authenticated user
    const data = { ...req.body, userId };
    toSetAssociations.forEach(assoc => delete data[assoc]);

    // Create the main record
    const item = await Model.create(data);
    if (!item)
        return res.status(500).json(frmtr('error', null, `Error creating ${Model.name}`));

    await applyAssociations(Model, item, resolved);

    res.status(201).json(frmtr('success', null, `${Model.name} created`));
};

const update = (Model, { requiredFields = [], toSetAssociations = [] } = {}) => async (req, res) => {
    const { userId } = req.user;

    if (!req.params.id)
        return res.status(400).json(frmtr('error', null, 'No id provided'));

    if (!isId(req.params.id))
        return res.status(400).json(frmtr('error', null, 'Invalid id provided'));

    const item = await findOwned(Model, req.params.id, userId);
    if (!item)
        return res.status(404).json(frmtr('error', null, `No ${Model.name} found with this id`));

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length)
        return res.status(400).json(frmtr('error', null, `Missing fields: ${missingFields.join(', ')}`));

    const { resolved, error } = await resolveAssociationIds(Model, req.body, toSetAssociations, userId);
    if (error)
        return res.status(400).json(frmtr('error', null, error));

    // Clone request body so we can remove linked associations keys, userId is forced so ownership cannot be transferred
    const data = { ...req.body, userId };
    toSetAssociations.forEach(assoc => delete data[assoc]);

    // Update the main record
    const resp = await item.update(data);
    if (!resp)
        return res.status(500).json(frmtr('error', null, `Error updating ${Model.name}`));

    await applyAssociations(Model, item, resolved);

    res.status(200).json(frmtr('success', null, `${Model.name} updated`));
};

const remove = (Model) => async (req, res) => {
    if (!req.params.id)
        return res.status(400).json(frmtr('error', null, 'No id provided'));

    if (!isId(req.params.id))
        return res.status(400).json(frmtr('error', null, 'Invalid id provided'));

    const item = await findOwned(Model, req.params.id, req.user.userId);
    if (!item)
        return res.status(404).json(frmtr('error', null, `No ${Model.name} found with this id`));

    const resp = await item.destroy();
    if (!resp)
        return res.status(500).json(frmtr('error', null, `Error deleting ${Model.name}`));

    res.status(200).json(frmtr('success', null, `${Model.name} deleted`));
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
