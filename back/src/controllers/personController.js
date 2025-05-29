const { Person, Music, Event, Season } = require('../database');
const { Op, literal } = require('sequelize');
const frmtr = require('../helpers/frmtr');

const baseController = require('../composables/baseController');

const searchFields = ['name', 'description'];
const requiredFields = ['userId', 'name'];
const associations = [
    { model: Music, as: 'musics' },
    { model: Event, as: 'events' },
    { model: Season, as: 'seasons' },
];
const toSetAssociations = ['musics', 'events', 'seasons'];

exports.getAllPeople = baseController.getAll(Person, {
    searchFields,
    defaultSort: [
        { order: 'DESC', orderBy: 'createdAt' },
        { order: 'ASC', orderBy: 'name' },
    ],
    associations,
});

exports.getUpcommingBirthdaysPeople = async (req, res) => {
    let { userId, page, perPage, days } = req.query;
    if (!userId)
        return res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

    const defaultDays = 30;
    days = parseInt(days) || defaultDays;

    // Build where clause
    let where = { userId };
    where[Op.and] = [
        literal(`
            strftime('%m-%d', Birthdate) >= strftime('%m-%d', 'now')
            AND strftime('%m-%d', Birthdate) <= strftime('%m-%d', 'now', '+${days} days')
        `)
    ]

    // Pagination setup
    const totalCount = await Person.count({ where });
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(perPage) || 10;
    const offset = (pageNumber - 1) * limit;
    const pagination = {
        page: pageNumber,
        perPage: limit,
        total: Math.ceil(totalCount / limit)
    };

    // Query, including associations if any
    const items = await Person.findAll({
        where, offset, limit, include: associations, order: [literal(`strftime('%m-%d', Birthdate) ASC`)]
    });
    res.status(200).json(frmtr('success', items, null, pagination));
}

exports.getPersonById = baseController.getById(Person, {
    associations,
});

exports.createPerson = baseController.create(Person, {
    requiredFields,
    toSetAssociations,
});

exports.updatePerson = baseController.update(Person, {
    requiredFields,
    toSetAssociations,
});

exports.deletePerson = baseController.remove(Person);
