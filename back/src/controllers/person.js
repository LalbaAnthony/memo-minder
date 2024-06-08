const formatRes = require('../helpers/formatRes')

const Person = require('../models/person');

exports.getAllPeople = async (req, res) => {
    try {
        const people = await Person.findAll();
        res.status(201).json(formatRes('success', people))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getPersonById = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const person = await Person.findByPk(req.params.id);
        if (!person) res.status(404).json(formatRes('sucess', null, 'No person found with this id'))
        res.status(201).json(formatRes('success', person))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createPerson = async (req, res) => {
    try {
        const { title, description } = req.body;
        const person = await Person.create({ title, description });
        res.status(201).json(person);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updatePerson = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const person = await Person.findByPk(req.params.id);
        if (!person) res.status(404).json(formatRes('error', null, 'No person found with this id'))
        const { title, description } = req.body;
        await person.update({ title, description });
        res.json(person);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};
