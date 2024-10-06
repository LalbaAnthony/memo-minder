const formatRes = require('../helpers/formatRes')

const { Op } = require('sequelize');

const Music = require('../models/music');
const User = require('../models/user');

exports.getAllMusics = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Sort
        if (!sort) {
            sort = [
                { order: 'DESC', orderBy: 'releaseDate' },
                { order: 'ASC', orderBy: 'createdAt' },
            ];
        }

        const order = sort.map(param => [param.orderBy, param.order]);

        // Pagination
        const musicsCount = await Music.count({ where: { userId } });
        const pagination = {
            page: parseInt(page) || 1,
            perPage: parseInt(perPage) || 10,
            total: Math.ceil(musicsCount / (parseInt(perPage) || 10)),
        };
        const offset = (pagination.page - 1) * pagination.perPage;

        // Construct the where clause
        let where = { userId };
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { artist: { [Op.like]: `%${search}%` } },
                { releaseDate: { [Op.like]: `%${search}%` } },
                { streamingLink: { [Op.like]: `%${search}%` } },
            ];
        }

        const musics = await Music.findAll({ where, order, offset, limit: pagination.perPage });

        return res.status(201).json(formatRes('success', musics, null, pagination));
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message));
    }
};

exports.getMusicById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Get the music and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const music = await Music.findByPk(parseInt(req.params.id));
        if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));

        return res.status(201).json(formatRes('success', music))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createMusic = async (req, res) => {
    const { userId, title, artist, releaseDate, streamingLink } = req.body;
    try {
        // Check if all fields are provided

        if (!userId || !title || !artist || !releaseDate || !streamingLink) return res.status(400).json(formatRes('error', null, 'Missing fields: userId, title, artist, releaseDate, streamingLink'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        const music = await Music.create({ userId, title, artist, releaseDate, streamingLink });
        if (!music) return res.status(404).json(formatRes('error', null, 'Error creating music'));

        return res.status(201).json(formatRes('success', null, 'Music created'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateMusic = async (req, res) => {
    const { userId, title, artist, releaseDate, streamingLink } = req.body;
    try {
        // Get the music and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const music = await Music.findByPk(parseInt(req.params.id));
        if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        const resp = await music.update({ userId, title, artist, releaseDate, streamingLink });
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error updating music'));

        return res.status(201).json(formatRes('success', null, 'Music updated'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteMusic = async (req, res) => {
    try {
        // Get the music and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const music = await Music.findByPk(parseInt(req.params.id));
        if (!music) return res.status(404).json(formatRes('error', null, 'No music found with this id'));

        const resp = await music.destroy();
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error deleting music'));

        return res.status(201).json(formatRes('success', null, 'Music deleted'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
}
