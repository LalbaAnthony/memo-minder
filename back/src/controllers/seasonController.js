const frmtr = require('../helpers/frmtr')

const { Op } = require('sequelize');

const Season = require('../models/seasonModel');
const Music = require('../models/musicModel');
const Person = require('../models/personModel');
const Mood = require('../models/moodModel');
const User = require('../models/userModel');

exports.getAllSeasons = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

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

        res.status(200).json(frmtr('success', seasons, null, pagination));
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message));
    }
};

exports.getSeasonById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

        // Get the season and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const season = await Season.findByPk(parseInt(req.params.id));
        if (!season) res.status(404).json(frmtr('error', null, 'No season found with this id'));

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

        res.status(200).json(frmtr('success', season))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.createSeason = async (req, res) => {
    const { userId, musicId, moodId, personId, title, color, description, dateStart, dateEnd} = req.body;
    try {
        // Check if all fields are provided
        if (!userId || !title || !color || !dateStart) res.status(400).json(frmtr('error', null, 'Missing fields: userId, title, color, dateStart'));

        // Check if userId exists
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) res.status(404).json(frmtr('error', null, 'No user found with this id'));

        if (musicId) {
            // Check if musicId exists
            const music = await Music.findByPk(parseInt(musicId));
            if (!music) res.status(404).json(frmtr('error', null, 'No music found with this id'));
        }

        if (personId) {
            // Check if personId exists
            const person = await Person.findByPk(parseInt(personId));
            if (!person) res.status(404).json(frmtr('error', null, 'No person found with this id'));
        }

        if (moodId) {
            // Check if moodId exists
            const mood = await Mood.findByPk(parseInt(moodId));
            if (!mood) res.status(404).json(frmtr('error', null, 'No mood found with this id'));
        }

        const season = await Season.create({userId, musicId, moodId, personId, title, color, description, dateStart, dateEnd});
        if (!season) res.status(500).json(frmtr('error', null, 'Error creating season'));

        res.status(201).json(frmtr('success', null, 'Season created'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.updateSeason = async (req, res) => {
    const { userId, musicId, moodId, personId, title, color, description, dateStart, dateEnd} = req.body;
    try {
        // Get the season and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const season = await Season.findByPk(parseInt(req.params.id));
        if (!season) res.status(404).json(frmtr('error', null, 'No season found with this id'));

        // Check if userId exists
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) res.status(404).json(frmtr('error', null, 'No user found with this id'));

        if (musicId) {
            // Check if musicId exists
            const music = await Music.findByPk(parseInt(musicId));
            if (!music) res.status(404).json(frmtr('error', null, 'No music found with this id'));
        }

        if (personId) {
            // Check if personId exists
            const person = await Person.findByPk(parseInt(personId));
            if (!person) res.status(404).json(frmtr('error', null, 'No person found with this id'));
        }

        if (moodId) {
            // Check if moodId exists
            const mood = await Mood.findByPk(parseInt(moodId));
            if (!mood) res.status(404).json(frmtr('error', null, 'No mood found with this id'));
        }

        const resp = await season.update({userId, musicId, moodId, personId, title, color, description, dateStart, dateEnd});
        if (!resp) res.status(500).json(frmtr('error', null, 'Error updating season'));

        res.status(201).json(frmtr('success', 'Season updated'))

    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.deleteSeason = async (req, res) => {
    try {
        // Get the season and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const season = await Season.findByPk(parseInt(req.params.id));
        if (!season) res.status(404).json(frmtr('error', null, 'No season found with this id'));

        const resp = await season.destroy();
        if (!resp) res.status(404).json(frmtr('error', null, 'Error deleting season'));

        res.status(200).json(frmtr('success', null, 'Season deleted'))

    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
}
