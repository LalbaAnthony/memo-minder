const formatRes = require('../helpers/formatRes')

const Music = require('../models/music');

exports.getAllMusics = async (req, res) => {
    try {
        const musics = await Music.findAll();
        res.status(201).json(formatRes('success', musics))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getMusicById = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const music = await Music.findByPk(req.params.id);
        if (!music) res.status(404).json(formatRes('sucess', null, 'No music found with this id'))
        res.status(201).json(formatRes('success', music))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createMusic = async (req, res) => {
    try {
        const { title, description } = req.body;
        const music = await Music.create({ title, description });
        res.status(201).json(music);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateMusic = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const music = await Music.findByPk(req.params.id);
        if (!music) res.status(404).json(formatRes('error', null, 'No music found with this id'))
        const { title, description } = req.body;
        await music.update({ title, description });
        res.json(music);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};
