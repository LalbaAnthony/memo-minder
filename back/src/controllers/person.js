const formatRes = require('../helpers/formatRes')

const { Op } = require('sequelize');

const Person = require('../models/person');
const User = require('../models/user');

exports.getAllPeople = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Sort
        if (!sort) {
            sort = [
                { order: 'ASC', orderBy: 'name' },
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

        return res.status(201).json(formatRes('success', people, null, pagination));
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message));
    }
};

exports.getPersonById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Get the person and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const person = await Person.findByPk(parseInt(req.params.id));
        if (!person) return res.status(404).json(formatRes('error', null, 'No person found with this id'));

        return res.status(201).json(formatRes('success', person))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createPerson = async (req, res) => {
    const { userId, name, description } = req.body;
    try {
        // Check if all fields are provided
        if (!userId || !name || !description) return res.status(400).json(formatRes('error', null, 'Missing fields: userId, name, description'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        const person = await Person.create({ personId, userId, name, description });
        if (!person) return res.status(404).json(formatRes('error', null, 'Error creating person'));

        return res.status(201).json(formatRes('success', person))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updatePerson = async (req, res) => {
    const { userId, name, description } = req.body;
    try {
        // Get the person and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const person = await Person.findByPk(parseInt(req.params.id));
        if (!person) return res.status(404).json(formatRes('error', null, 'No person found with this id'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        const resp = await person.update({ personId, userId, name, description });
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error updating person'));

        return res.status(201).json(formatRes('success', person))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deletePerson = async (req, res) => {
    try {
        // Get the person and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const person = await Person.findByPk(parseInt(req.params.id));
        if (!person) return res.status(404).json(formatRes('error', null, 'No person found with this id'));

        const resp = await person.destroy();
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error deleting person'));

        return res.status(201).json(formatRes('success', null, 'Person deleted'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
}
