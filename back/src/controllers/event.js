const formatRes = require('../helpers/formatRes')

const { Op } = require('sequelize');

const Event = require('../models/event');
const Season = require('../models/season');
const Music = require('../models/music');
const Person = require('../models/person');
const Mood = require('../models/mood');
const User = require('../models/user');

exports.getAllEvents = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Sort
        if (!sort) {
            sort = [
                { order: 'DESC', orderBy: 'date' },
                { order: 'ASC', orderBy: 'createdAt' },
            ];
        }

        const order = sort.map(param => [param.orderBy, param.order]);

        // Pagination
        const eventsCount = await Event.count({ where: { userId } });
        const pagination = {
            page: parseInt(page) || 1,
            perPage: parseInt(perPage) || 10,
            total: Math.ceil(eventsCount / (parseInt(perPage) || 10)),
        };
        const offset = (pagination.page - 1) * pagination.perPage;

        // Construct the where clause
        let where = { userId };
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { location: { [Op.like]: `%${search}%` } },
            ];
        }

        const events = await Event.findAll({ where, order, offset, limit: pagination.perPage });

        for (let i = 0; i < events.length; i++) {
            // Add music to the event
            if (events[i].musicId) {
                const music = await Music.findByPk(parseInt(events[i].musicId));
                if (music) events[i].dataValues.music = music.dataValues;
            }

            // Add person to the event
            if (events[i].personId) {
                const person = await Person.findByPk(parseInt(events[i].personId));
                if (person) events[i].dataValues.person = person.dataValues;
            }

            // Add mood to the event
            if (events[i].moodId) {
                const mood = await Mood.findByPk(parseInt(events[i].moodId));
                if (mood) events[i].dataValues.mood = mood.dataValues;
            }

            // Add season to the event
            if (events[i].seasonId) {
                const season = await Season.findByPk(parseInt(events[i].seasonId));
                if (season) events[i].dataValues.season = season.dataValues;
            }
        }

        return res.status(201).json(formatRes('success', events, null, pagination));
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message));
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

        // Add music to the event
        if (event.musicId) {
            const music = await Music.findByPk(parseInt(event.musicId));
            if (music) event.dataValues.music = music.dataValues;
        }

        // Add person to the event
        if (event.personId) {
            const person = await Person.findByPk(parseInt(event.personId));
            if (person) event.dataValues.person = person.dataValues;
        }

        // Add mood to the event
        if (event.moodId) {
            const mood = await Mood.findByPk(parseInt(event.moodId));
            if (mood) event.dataValues.mood = mood.dataValues;
        }

        // Add season to the event
        if (event.seasonId) {
            const season = await Season.findByPk(parseInt(event.seasonId));
            if (season) event.dataValues.season = season.dataValues;
        }

        return res.status(201).json(formatRes('success', event))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createEvent = async (req, res) => {
    const { musicId, personId, moodId, userId, seasonId, title, description, date, location } = req.body;
    try {
        // Check if all fields are provided
        if (!userId || !title || !description || !date || !location) return res.status(400).json(formatRes('error', null, 'Missing fields: musicId, moodId, userId, title, description, date, location'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (musicId) {
            // Check if musicId exists
            const music = await Music.findByPk(parseInt(musicId));
            if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));
        }

        if (personId) {
            // Check if personId exists
            const person = await Person.findByPk(parseInt(personId));
            if (!person) return res.status(404).json(formatRes('error', null, 'No person found with this id'));
        }

        if (moodId) {
            // Check if moodId exists
            const mood = await Mood.findByPk(parseInt(moodId));
            if (!mood) return res.status(404).json(formatRes('error', null, 'No mood found with this id'));
        }

        if (seasonId) {
            // Check if seasonId exists
            const season = await Season.findByPk(parseInt(seasonId));
            if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const event = await Event.create({ musicId, userId, seasonId, title, description, date, location });
        if (!event) return res.status(404).json(formatRes('error', null, 'Error creating event'));

        return res.status(201).json(formatRes('success', null, 'Event created'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateEvent = async (req, res) => {
    const { musicId, personId, moodId, userId, seasonId, title, description, date, location } = req.body;
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

        if (personId) {
            // Check if personId exists
            const person = await Person.findByPk(parseInt(personId));
            if (!person) return res.status(404).json(formatRes('error', null, 'No person found with this id'));
        }

        if (moodId) {
            // Check if moodId exists
            const mood = await Mood.findByPk(parseInt(moodId));
            if (!mood) return res.status(404).json(formatRes('error', null, 'No mood found with this id'));
        }

        if (seasonId) {
            // Check if seasonId exists
            const season = await Season.findByPk(parseInt(seasonId));
            if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));
        }

        const resp = await event.update({ musicId, userId, seasonId, title, description, date, location });
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error updating event'));

        return res.status(201).json(formatRes('success', null, 'Event updated'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteEvent = async (req, res) => {
    try {
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
