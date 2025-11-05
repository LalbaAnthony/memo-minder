const { Person, Music, Event, Season } = require('../database');
const { Op, literal } = require('sequelize');
const frmtr = require('../helpers/frmtr');
const { sequelize } = require('../database');

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
    const dialect = sequelize.getDialect();

    // Calculate date boundary info for both logic and ordering
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + days);
    const crossesYearBoundary = end.getFullYear() > now.getFullYear();

    if (dialect === 'mysql') {
        if (crossesYearBoundary) {
            // Handle year wrap-around in MySQL
            where[Op.and] = [
                literal(`
                        (DATE_FORMAT(Birthdate, '%m-%d') >= DATE_FORMAT(NOW(), '%m-%d')
                        OR DATE_FORMAT(Birthdate, '%m-%d') <= DATE_FORMAT(DATE_ADD(NOW(), INTERVAL ${days} DAY), '%m-%d'))
                    `)
            ];
        } else {
            where[Op.and] = [
                literal(`
                        DATE_FORMAT(Birthdate, '%m-%d') >= DATE_FORMAT(NOW(), '%m-%d')
                        AND DATE_FORMAT(Birthdate, '%m-%d') <= DATE_FORMAT(DATE_ADD(NOW(), INTERVAL ${days} DAY), '%m-%d')
                    `)
            ];
        }
    } else if (dialect === 'sqlite') {
        // Handle year wrap-around in SQLite
        const condition = crossesYearBoundary
            ? `
                    (strftime('%m-%d', Birthdate) >= strftime('%m-%d', 'now')
                    OR strftime('%m-%d', Birthdate) <= strftime('%m-%d', 'now', '+${days} days'))
                `
            : `
                    strftime('%m-%d', Birthdate) >= strftime('%m-%d', 'now')
                    AND strftime('%m-%d', Birthdate) <= strftime('%m-%d', 'now', '+${days} days')
                `;
        where[Op.and] = [literal(condition)];
    }

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

    // ORDER BY logic that correctly handles wrap-around
    let orderLiteral;
    if (dialect === 'mysql') {
        orderLiteral = crossesYearBoundary
            ? literal(`
                    CASE
                        WHEN DATE_FORMAT(Birthdate, '%m-%d') >= DATE_FORMAT(NOW(), '%m-%d') THEN 1
                        ELSE 2
                    END,
                    DATE_FORMAT(Birthdate, '%m-%d') ASC
                `)
            : literal(`DATE_FORMAT(Birthdate, '%m-%d') ASC`);
    } else if (dialect === 'sqlite') {
        orderLiteral = crossesYearBoundary
            ? literal(`
                    CASE
                        WHEN strftime('%m-%d', Birthdate) >= strftime('%m-%d', 'now') THEN 1
                        ELSE 2
                    END,
                    strftime('%m-%d', Birthdate) ASC
                `)
            : literal(`strftime('%m-%d', Birthdate) ASC`);
    }

    // Query with associations and corrected ordering
    const items = await Person.findAll({
        where,
        offset,
        limit,
        include: associations,
        order: [orderLiteral]
    });

    res.status(200).json(frmtr('success', items, null, pagination));
};

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
