const formatRes = require('../helpers/formatRes')

const Event = require('../models/event');
const Music = require('../models/music');
const User = require('../models/user');
const Seasons = require('../models/season');

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

        // Check if event exists
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) res.status(404).json(formatRes('error', null, 'No event found with this id'));

        res.status(201).json(formatRes('success', event))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createEvent = async (req, res) => {
    const { music_id, user_id, season_id, title, description, date, location } = req.body;
    try {
        // Check if user_id exists
        const user = await User.findByPk(parseInt(user_id));
        if (!user) res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (music_id) {
            // Check if music_id exists
            const music = await Music.findByPk(parseInt(music_id));
            if (!music) res.status(404).json(formatRes('error', null, 'No music found with this id'));
        }

        if (season_id) {
            // Check if season_id exists
            const season = await Seasons.findByPk(parseInt(season_id));
            if (!season) res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const event = await Event.create({ music_id, user_id, season_id, title, description, date, location });
        if (!event) res.status(404).json(formatRes('error', null, 'Error creating event'));

        res.status(201).json(formatRes('success', event))

    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateEvent = async (req, res) => {
    const { music_id, user_id, season_id, title, description, date, location } = req.body;
    try {
        // Check if event exists
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) res.status(404).json(formatRes('error', null, 'No event found with this id'));

        // Check if user_id exists
        const user = await User.findByPk(parseInt(user_id));
        if (!user) res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (music_id) {
            // Check if music_id exists
            const music = await Music.findByPk(parseInt(music_id));
            if (!music) res.status(404).json(formatRes('error', null, 'No music found with this id'));
        }

        if (season_id) {
            // Check if season_id exists
            const season = await Seasons.findByPk(parseInt(season_id));
            if (!season) res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const resp = await event.update({ music_id, user_id, season_id, title, description, date, location });
        if (!resp) res.status(404).json(formatRes('error', null, 'Error updating event'));

        res.status(201).json(formatRes('success', event))

    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        // Check if event exists
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) res.status(404).json(formatRes('error', null, 'No event found with this id'));

        const resp = await event.destroy();
        if (!resp) res.status(404).json(formatRes('error', null, 'Error deleting event'));

        res.status(201).json(formatRes('success', null, 'Event deleted'))

    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
}
