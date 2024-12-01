const frmtr = require('../helpers/frmtr')

const { Op } = require('sequelize');

const Person = require('../models/person');
const User = require('../models/user');

exports.getAllPeople = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

        // Sort
        if (!sort) {
            sort = [
                { order: 'ASC', orderBy: 'createdAt' },
            ];
        }

        const order = sort.map(param => [param.orderBy, param.order]);

        // Pagination
        const peopleCount = await Person.count({ where: { userId } });
        const pagination = {
            page: parseInt(page) || 1,
            perPage: parseInt(perPage) || 10,
            total: Math.ceil(peopleCount / (parseInt(perPage) || 10)),
        };
        const offset = (pagination.page - 1) * pagination.perPage;

        // Construct the where clause
        let where = { userId };
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ];
        }

        const people = await Person.findAll({ where, order, offset, limit: pagination.perPage });

        res.status(200).json(frmtr('success', people, null, pagination));
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message));
    }
};

exports.getPersonById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

        // Get the person and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const person = await Person.findByPk(parseInt(req.params.id));
        if (!person) res.status(404).json(frmtr('error', null, 'No person found with this id'));

        res.status(200).json(frmtr('success', person))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.createPerson = async (req, res) => {
    const { userId, name, description } = req.body;
    try {
        // Check if all fields are provided
        if (!userId || !name || !description) res.status(400).json(frmtr('error', null, 'Missing fields: userId, name, description'));

        // Check if userId exists
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) res.status(404).json(frmtr('error', null, 'No user found with this id'));

        const person = await Person.create({ userId, name, description });
        if (!person) res.status(500).json(frmtr('error', null, 'Error creating person'));

        res.status(201).json(frmtr('success', null, 'Person created'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.updatePerson = async (req, res) => {
    const { userId, name, description } = req.body;
    try {
        // Get the person and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const person = await Person.findByPk(parseInt(req.params.id));
        if (!person) res.status(404).json(frmtr('error', null, 'No person found with this id'));

        // Check if userId exists
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) res.status(404).json(frmtr('error', null, 'No user found with this id'));

        const resp = await person.update({ userId, name, description });
        if (!resp) res.status(500).json(frmtr('error', null, 'Error updating person'));

        res.status(201).json(frmtr('success', null, 'Person updated'))

    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.deletePerson = async (req, res) => {
    try {
        // Get the person and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const person = await Person.findByPk(parseInt(req.params.id));
        if (!person) res.status(404).json(frmtr('error', null, 'No person found with this id'));

        const resp = await person.destroy();
        if (!resp) res.status(404).json(frmtr('error', null, 'Error deleting person'));

        res.status(200).json(frmtr('success', null, 'Person deleted'))

    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
}
