const formatRes = require('../helpers/formatRes')

const Event = require('../models/event');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(201).json(formatRes('success', events))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getEventById = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const event = await Event.findByPk(req.params.id);
        if (!event) res.status(404).json(formatRes('sucess', null, 'No event found with this id'))
        res.status(201).json(formatRes('success', event))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, description } = req.body;
        const event = await Event.create({ title, description });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateEvent = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const event = await Event.findByPk(req.params.id);
        if (!event) res.status(404).json(formatRes('error', null, 'No event found with this id'))
        const { title, description } = req.body;
        await event.update({ title, description });
        res.json(event);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};
