const formatRes = require('../helpers/formatRes')

const Season = require('../models/season');

exports.getAllSeasons = async (req, res) => {
    try {
        const seasons = await Season.findAll();
        res.status(201).json(formatRes('success', seasons))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getSeasonById = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const season = await Season.findByPk(req.params.id);
        if (!season) res.status(404).json(formatRes('sucess', null, 'No season found with this id'))
        res.status(201).json(formatRes('success', season))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createSeason = async (req, res) => {
    try {
        const { title, description } = req.body;
        const season = await Season.create({ title, description });
        res.status(201).json(season);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateSeason = async (req, res) => {
    try {
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))
        const season = await Season.findByPk(req.params.id);
        if (!season) res.status(404).json(formatRes('error', null, 'No season found with this id'))
        const { title, description } = req.body;
        await season.update({ title, description });
        res.json(season);
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};
