const formatRes = require('../helpers/formatRes')

const Event = require('../models/event');
const Music = require('../models/music');
const User = require('../models/user');
const Seasons = require('../models/season');

exports.getAllEvents = async (req, res) => {
    const { userId, sort, page, perPage } = req.query;
    console.log('req.query', req.query)
    try {
        // Check if all fields are provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        const sortReq = sort || [{ order: 'DESC', orderBy: 'date' }];
        
        const pageReq = parseInt(page) || 1;
        const perPageReq = parseInt(perPage) || 10;

        const total = await Event.count({ where: { userId } });

        const pagination = {
            page: pageReq,
            perPage: perPageReq,
            total
        }

        const events = await Event.findAll({ where: { userId }, order: [[sortReq.orderBy, sortReq.order]], limit: perPageReq, offset: (pageReq - 1) * perPageReq });
        return res.status(201).json(formatRes('success', events, null, pagination))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getEventById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Get the event and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) return res.status(404).json(formatRes('error', null, 'No event found with this id'));

        return res.status(201).json(formatRes('success', event))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createEvent = async (req, res) => {
    const { musicId, userId, seasonId, title, description, date, location } = req.body;
    try {
        // Check if all fields are provided
        if (!musicId || !userId || !title || !description || !date || !location) return res.status(400).json(formatRes('error', null, 'Missing fields: musicId, userId, title, description, date, location'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (musicId) {
            // Check if musicId exists
            const music = await Music.findByPk(parseInt(musicId));
            if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));
        }

        if (seasonId) {
            // Check if seasonId exists
            const season = await Seasons.findByPk(parseInt(seasonId));
            if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const event = await Event.create({ musicId, userId, seasonId, title, description, date, location });
        if (!event) return res.status(404).json(formatRes('error', null, 'Error creating event'));

        return res.status(201).json(formatRes('success', event))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateEvent = async (req, res) => {
    const { musicId, userId, seasonId, title, description, date, location } = req.body;
    try {
        // Get the event and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) return res.status(404).json(formatRes('error', null, 'No event found with this id'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (musicId) {
            // Check if musicId exists
            const music = await Music.findByPk(parseInt(musicId));
            if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));
        }

        if (seasonId) {
            // Check if seasonId exists
            const season = await Seasons.findByPk(parseInt(seasonId));
            if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const resp = await event.update({ musicId, userId, seasonId, title, description, date, location });
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error updating event'));

        return res.status(201).json(formatRes('success', event))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteEvent = async (req, res) => {    try {
        // Get the event and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) return res.status(404).json(formatRes('error', null, 'No event found with this id'));

        const resp = await event.destroy();
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error deleting event'));

        return res.status(201).json(formatRes('success', null, 'Event deleted'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
}
