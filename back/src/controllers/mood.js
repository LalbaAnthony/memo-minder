const formatRes = require('../helpers/formatRes')

const Mood = require('../models/mood');

exports.getAllMoods = async (req, res) => {
    try {
        const moods = await Mood.findAll();
        return res.status(200).json(formatRes('success', moods))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getMoodById = async (req, res) => {
    try {
        // Check if mood exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const mood = await Mood.findByPk(parseInt(req.params.id));
        if (!mood) return res.status(404).json(formatRes('error', null, 'No mood found with this id'));

        return res.status(200).json(formatRes('success', mood))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};