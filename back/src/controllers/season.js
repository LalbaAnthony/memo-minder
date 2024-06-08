const Season = require('../models/season');

exports.getAllSeasons = async (req, res) => {
    try {
        const seasons = await Season.findAll();
        res.json(seasons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSeasonById = async (req, res) => {
    try {
        const season = await Season.findByPk(req.params.id);
        if (!season) {
            return res.status(404).json({ error: 'Season not found' });
        }
        res.json(season);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSeason = async (req, res) => {
    try {
        const { title, description } = req.body;
        const season = await Season.create({ title, description });
        res.status(201).json(season);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSeason = async (req, res) => {
    try {
        const season = await Season.findByPk(req.params.id);
        if (!season) {
            return res.status(404).json({ error: 'Season not found' });
        }
        const { title, description } = req.body;
        await season.update({ title, description });
        res.json(season);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
