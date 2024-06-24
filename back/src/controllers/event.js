const formatRes = require('../helpers/formatRes')

const Event = require('../models/event');
const Music = require('../models/music');
const User = require('../models/user');
const Seasons = require('../models/season');

exports.getAllEvents = async (req, res) => {
    const { token, user_id, sort, page, per_page } = req.body;
    try {
        // Check for token
        if (!token) return res.status(404).json(formatRes('error', null, 'No token provided'));
        if (!verifiyingToken(token)) return res.status(404).json(formatRes('error', null, 'Invalid token'));

        // Check if all fields are provided
        if (!user_id) return res.status(404).json(formatRes('error', null, 'Missing fields: user_id'));

        const sortReq = sort || [{ order: 'DESC', order_by: 'date' }];
        const pageReq = parseInt(page) || 1;
        const per_pageReq = parseInt(per_page) || 10;

        const events = await Event.findAll({ where: { user_id }, order: [[sortReq.order_by, sortReq.order]], limit: per_pageReq, offset: (pageReq - 1) * per_pageReq });
        return res.status(201).json(formatRes('success', events))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getEventById = async (req, res) => {
    const { token, user_id } = req.body;
    try {
        // Check for token
        if (!token) return res.status(404).json(formatRes('error', null, 'No token provided'));
        if (!verifiyingToken(token)) return res.status(404).json(formatRes('error', null, 'Invalid token'));

        // Check if all fields are provided
        if (!user_id) return res.status(404).json(formatRes('error', null, 'Missing fields: user_id'));

        // Get the event and check if it exists
        if (!req.params.id) return res.status(404).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) return res.status(404).json(formatRes('error', null, 'No event found with this id'));

        return res.status(201).json(formatRes('success', event))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createEvent = async (req, res) => {
    const { token, music_id, user_id, season_id, title, description, date, location } = req.body;
    try {
        // Check for token
        if (!token) return res.status(404).json(formatRes('error', null, 'No token provided'));
        if (!verifiyingToken(token)) return res.status(404).json(formatRes('error', null, 'Invalid token'));

        // Check if all fields are provided
        if (!music_id || !user_id || !title || !description || !date || !location) return res.status(404).json(formatRes('error', null, 'Missing fields: music_id, user_id, title, description, date, location'));

        // Check if user_id exists
        if (!user_id) return res.status(404).json(formatRes('error', null, 'Missing fields: user_id'));
        const user = await User.findByPk(parseInt(user_id));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (music_id) {
            // Check if music_id exists
            const music = await Music.findByPk(parseInt(music_id));
            if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));
        }

        if (season_id) {
            // Check if season_id exists
            const season = await Seasons.findByPk(parseInt(season_id));
            if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const event = await Event.create({ music_id, user_id, season_id, title, description, date, location });
        if (!event) return res.status(404).json(formatRes('error', null, 'Error creating event'));

        return res.status(201).json(formatRes('success', event))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateEvent = async (req, res) => {
    const { token, music_id, user_id, season_id, title, description, date, location } = req.body;
    try {
        // Check for token
        if (!token) return res.status(404).json(formatRes('error', null, 'No token provided'));
        if (!verifiyingToken(token)) return res.status(404).json(formatRes('error', null, 'Invalid token'));

        // Get the event and check if it exists
        if (!req.params.id) return res.status(404).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) return res.status(404).json(formatRes('error', null, 'No event found with this id'));

        // Check if user_id exists
        if (!user_id) return res.status(404).json(formatRes('error', null, 'Missing fields: user_id'));
        const user = await User.findByPk(parseInt(user_id));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (music_id) {
            // Check if music_id exists
            const music = await Music.findByPk(parseInt(music_id));
            if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));
        }

        if (season_id) {
            // Check if season_id exists
            const season = await Seasons.findByPk(parseInt(season_id));
            if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const resp = await event.update({ music_id, user_id, season_id, title, description, date, location });
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error updating event'));

        return res.status(201).json(formatRes('success', event))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteEvent = async (req, res) => {
    const { token } = req.body;
    try {
        // Check for token
        if (!token) return res.status(404).json(formatRes('error', null, 'No token provided'));
        if (!verifiyingToken(token)) return res.status(404).json(formatRes('error', null, 'Invalid token'));

        // Get the event and check if it exists
        if (!req.params.id) return res.status(404).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) return res.status(404).json(formatRes('error', null, 'No event found with this id'));

        const resp = await event.destroy();
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error deleting event'));

        return res.status(201).json(formatRes('success', null, 'Event deleted'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
}
