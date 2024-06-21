const formatRes = require('../helpers/formatRes')

const Event = require('../models/event');
const Music = require('../models/music');
const User = require('../models/user');
const Seasons = require('../models/season');
const e = require('express');

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
        let errors = [];

        // Check for id
        if (!req.params.id) errors.push('No id provided')

        // Check if event exists
        const event = await Event.findByPk(req.params.id);
        if (!event) errors.push('No event found with this id')

        if (errors.length > 0) res.status(404).json(formatRes('error', null, errors[0]))

        res.status(201).json(formatRes('success', event))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { music_id, user_id, season_id, title, description, date, location } = req.body;

        let errors = [];

        // Check for user_id
        if (errors.length === 0 && !user_id) errors.push('No user_id provided')
        if (errors.length === 0 && isNaN(user_id)) errors.push('user_id must be an integer')

        // Check if user_id exists
        const user = await User.findByPk(user_id);
        if (errors.length === 0 && !user) errors.push('No user found with this id')

        if (music_id) {
            // Check if music_id is an integer
            if (errors.length === 0 && isNaN(music_id)) errors.push('music_id must be an integer')
            // Check if music_id exists
            const music = await Music.findByPk(music_id);
            if (errors.length === 0 && !music) errors.push('No music found with this id')
        }

        if (season_id) {
            // Check if music_id is an integer
            if (errors.length === 0 && isNaN(music_id)) errors.push('music_id must be an integer')
            // Check if season_id exists
            const season = await Seasons.findByPk(season_id);
            if (errors.length === 0 && !season) errors.push('No season found with this id')
        }

        const event = await Event.create({ music_id, user_id, season_id, title, description, date, location });
        if (!event) errors.push('Error creating event')

        if (errors.length > 0) res.status(404).json(formatRes('error', null, errors[0]))

        res.status(201).json(formatRes('success', event))

    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { music_id, user_id, season_id, title, description, date, location } = req.body;

        let errors = [];

        // Check if id exists
        if (!req.params.id) errors.push('No id provided')

        // Check if event exists
        const event = await Event.findByPk(req.params.id);
        if (!event) errors.push('No event found with this id')

        // Check for user_id
        if (errors.length === 0 && !user_id) errors.push('No user_id provided')
        if (errors.length === 0 && isNaN(user_id)) errors.push('user_id must be an integer')

        // Check if user_id exists
        const user = await User.findByPk(user_id);
        if (errors.length === 0 && !user) errors.push('No user found with this id')

        if (music_id) {
            // Check if music_id is an integer
            if (errors.length === 0 && isNaN(music_id)) errors.push('music_id must be an integer')
            // Check if music_id exists
            const music = await Music.findByPk(music_id);
            if (errors.length === 0 && !music) errors.push('No music found with this id')
        }

        if (season_id) {
            // Check if music_id is an integer
            if (errors.length === 0 && isNaN(music_id)) errors.push('music_id must be an integer')
            // Check if season_id exists
            const season = await Seasons.findByPk(season_id);
            if (errors.length === 0 && !season) errors.push('No season found with this id')
        }

        const resp = await event.update({ music_id, user_id, season_id, title, description, date, location });
        if (!resp) errors.push('Error updating event')

        if (errors.length > 0) res.status(404).json(formatRes('error', null, errors[0]))

        res.status(201).json(formatRes('success', event))

    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteEvent = async (req, res) => {
    try {

        let errors = [];

        // Check if id exists
        if (!req.params.id) errors.push('No id provided')

        // Check if event exists
        const event = await Event.findByPk(req.params.id);
        if (!event) errors.push('No event found with this id')

        const resp = await event.destroy();
        if (!resp) errors.push('Error deleting event')

        if (errors.length > 0) res.status(404).json(formatRes('error', null, errors[0]))

        res.status(201).json(formatRes('success', null, 'Event deleted'))

    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
}
