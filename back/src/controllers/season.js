const formatRes = require('../helpers/formatRes')

const { Op } = require('sequelize');

const Season = require('../models/season');
const Music = require('../models/music');
const Person = require('../models/person');
const Mood = require('../models/mood');
const User = require('../models/user');

exports.getAllSeasons = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Sort
        if (!sort) {
            sort = [
                { order: 'DESC', orderBy: 'dateStart' },
                { order: 'ASC', orderBy: 'createdAt' },
            ];
        }

        const order = sort.map(param => [param.orderBy, param.order]);

        // Pagination
        const seasonsCount = await Season.count({ where: { userId } });
        const pagination = {
            page: parseInt(page) || 1,
            perPage: parseInt(perPage) || 10,
            total: Math.ceil(seasonsCount / (parseInt(perPage) || 10)),
        };
        const offset = (pagination.page - 1) * pagination.perPage;

        // Construct the where clause
        let where = { userId };
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ];
        }

        const seasons = await Season.findAll({ where, order, offset, limit: pagination.perPage });

        for (let i = 0; i < seasons.length; i++) {
            // Add music to the season
            if (seasons[i].musicId) {
                const music = await Music.findByPk(parseInt(seasons[i].musicId));
                if (music) seasons[i].dataValues.music = music.dataValues;
            }

            // Add person to the season
            if (seasons[i].personId) {
                const person = await Person.findByPk(parseInt(seasons[i].personId));
                if (person) seasons[i].dataValues.person = person.dataValues;
            }

            // Add mood to the season
            if (seasons[i].moodId) {
                const mood = await Mood.findByPk(parseInt(seasons[i].moodId));
                if (mood) seasons[i].dataValues.mood = mood.dataValues;
            }
        }

        return res.status(201).json(formatRes('success', seasons, null, pagination));
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message));
    }
};

exports.getSeasonById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Get the season and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const season = await Season.findByPk(parseInt(req.params.id));
        if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));

        // Add music to the season
        if (season.musicId) {
            const music = await Music.findByPk(parseInt(season.musicId));
            if (music) season.dataValues.music = music.dataValues;
        }

        // Add person to the season
        if (season.personId) {
            const person = await Person.findByPk(parseInt(season.personId));
            if (person) season.dataValues.person = person.dataValues;
        }

        // Add mood to the season
        if (season.moodId) {
            const mood = await Mood.findByPk(parseInt(season.moodId));
            if (mood) season.dataValues.mood = mood.dataValues;
        }

        return res.status(201).json(formatRes('success', season))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createSeason = async (req, res) => {
    const { userId, musicId, moodId, personId, title, color, description, dateStart, dateEnd} = req.body;
    try {
        // Check if all fields are provided
        if (!userId || !title || !color || !dateStart) return res.status(400).json(formatRes('error', null, 'Missing fields: userId, title, color, dateStart'));

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

        const season = await Season.create({ musicId, userId, seasonId, title, description, date });
        if (!season) return res.status(404).json(formatRes('error', null, 'Error creating season'));

        return res.status(201).json(formatRes('success', season))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateSeason = async (req, res) => {
    const { userId, musicId, moodId, personId, title, color, description, dateStart, dateEnd} = req.body;
    try {
        // Get the season and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const season = await Season.findByPk(parseInt(req.params.id));
        if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));

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

        const resp = await season.update({ musicId, userId, seasonId, title, description, date });
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error updating season'));

        return res.status(201).json(formatRes('success', season))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteSeason = async (req, res) => {
    try {
        // Get the season and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const season = await Season.findByPk(parseInt(req.params.id));
        if (!season) return res.status(404).json(formatRes('error', null, 'No season found with this id'));

        const resp = await season.destroy();
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error deleting season'));

        return res.status(201).json(formatRes('success', null, 'Season deleted'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
}
