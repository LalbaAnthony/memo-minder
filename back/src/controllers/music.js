const frmtr = require('../helpers/frmtr')

const { Op } = require('sequelize');

const Music = require('../models/music');
const User = require('../models/user');

exports.getAllMusics = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

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

        res.status(200).json(frmtr('success', musics, null, pagination));
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message));
    }
};

exports.getMusicById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

        // Get the music and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const music = await Music.findByPk(parseInt(req.params.id));
        if (!music) res.status(404).json(frmtr('error', null, 'No music found with this id'));

        res.status(200).json(frmtr('success', music))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.createMusic = async (req, res) => {
    const { userId, title, artist, releaseDate, streamingLink } = req.body;
    try {
        // Check if all fields are provided

        if (!userId || !title || !artist || !releaseDate || !streamingLink) res.status(400).json(frmtr('error', null, 'Missing fields: userId, title, artist, releaseDate, streamingLink'));

        // Check if userId exists
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) res.status(404).json(frmtr('error', null, 'No user found with this id'));

        const music = await Music.create({ userId, title, artist, releaseDate, streamingLink });
        if (!music) res.status(500).json(frmtr('error', null, 'Error creating music'));

        res.status(201).json(frmtr('success', null, 'Music created'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.updateMusic = async (req, res) => {
    const { userId, title, artist, releaseDate, streamingLink } = req.body;
    try {
        // Get the music and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const music = await Music.findByPk(parseInt(req.params.id));
        if (!music) res.status(404).json(frmtr('error', null, 'No music found with this id'));

        // Check if userId exists
        if (!userId) res.status(400).json(frmtr('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) res.status(404).json(frmtr('error', null, 'No user found with this id'));

        const resp = await music.update({ userId, title, artist, releaseDate, streamingLink });
        if (!resp) res.status(500).json(frmtr('error', null, 'Error updating music'));

        res.status(201).json(frmtr('success', null, 'Music updated'))

    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.deleteMusic = async (req, res) => {
    try {
        // Get the music and check if it exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const music = await Music.findByPk(parseInt(req.params.id));
        if (!music) res.status(404).json(frmtr('error', null, 'No music found with this id'));

        const resp = await music.destroy();
        if (!resp) res.status(404).json(frmtr('error', null, 'Error deleting music'));

        res.status(200).json(frmtr('success', null, 'Music deleted'))

    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
}
