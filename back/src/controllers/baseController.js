// controllers/baseController.js
const { Op } = require('sequelize');
const frmtr = require('../helpers/frmtr');

// Helper to capitalize the first letter (for building setter method names)
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const getAll = (Model, { searchFields = [], defaultSort = [], associations = [] } = {}) => async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    if (!userId)
        return res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

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
    const { userId } = req.query;
    if (!userId)
        return res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

    if (!req.params.id)
        return res.status(400).json(frmtr('error', null, 'No id provided'));

    const item = await Model.findByPk(parseInt(req.params.id), { include: associations });
    
    if (!item)
        return res.status(404).json(frmtr('error', null, `No ${Model.name} found with this id`));

    if (item.userId !== parseInt(userId))
        return res.status(403).json(frmtr('error', null, 'Unauthorized'));

    res.status(200).json(frmtr('success', item));
};

const create = (Model, { requiredFields = [], toSetAssociations = [] } = {}) => async (req, res) => {
    // Check for missing required fields
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length)
        return res.status(400).json(frmtr('error', null, `Missing fields: ${missingFields.join(', ')}`));

    // Clone request body so we can remove linked associations keys
    const data = { ...req.body };
    toSetAssociations.forEach(assoc => delete data[assoc]);

    // Create the main record
    const item = await Model.create(data);
    if (!item)
        return res.status(500).json(frmtr('error', null, `Error creating ${Model.name}`));

    // If the request includes linked many-to-many associations, set them here.
    // Example: if toSetAssociations includes "musics", then if req.body.musics is provided,
    // we call item.setMusics(req.body.musics)
    for (const assoc of toSetAssociations) {
        if (req.body[assoc] && Array.isArray(req.body[assoc])) {
            const setter = `set${capitalize(assoc)}`;
            if (typeof item[setter] === 'function') {
                await item[setter](req.body[assoc]);
            } else {
                console.warn(`Association setter ${setter} not found on ${Model.name}`);
            }
        }
    }

    res.status(201).json(frmtr('success', null, `${Model.name} created`));
};

const update = (Model, { requiredFields = [] } = {}) => async (req, res) => {
    if (!req.params.id)
        return res.status(400).json(frmtr('error', null, 'No id provided'));

    const item = await Model.findByPk(parseInt(req.params.id));
    if (!item)
        return res.status(404).json(frmtr('error', null, `No ${Model.name} found with this id`));

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length)
        return res.status(400).json(frmtr('error', null, `Missing fields: ${missingFields.join(', ')}`));

    // Clone request body so we can remove linked associations keys
    const data = { ...req.body };
    const toSetAssociations = Object.keys(item.getAssociations());
    toSetAssociations.forEach(assoc => delete data[assoc]);

    // Update the main record
    const resp = await item.update(data);
    if (!resp)
        return res.status(500).json(frmtr('error', null, `Error updating ${Model.name}`));

    // If the request includes linked many-to-many associations, set them here.
    // Example: if toSetAssociations includes "musics", then if req.body.musics is provided,
    // we call item.setMusics(req.body.musics)
    for (const assoc of toSetAssociations) {
        if (req.body[assoc] && Array.isArray(req.body[assoc])) {
            const setter = `set${capitalize(assoc)}`;
            if (typeof item[setter] === 'function') {
                await item[setter](req.body[assoc]);
            } else {
                console.warn(`Association setter ${setter} not found on ${Model.name}`);
            }
        }
    }

    res.status(200).json(frmtr('success', null, `${Model.name} updated`));
};

const remove = (Model) => async (req, res) => {
    if (!req.params.id)
        return res.status(400).json(frmtr('error', null, 'No id provided'));

    const item = await Model.findByPk(parseInt(req.params.id));
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
