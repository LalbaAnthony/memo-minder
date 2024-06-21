const formatRes = require('../helpers/formatRes')

const Mood = require('../models/mood');

exports.getAllMoods = async (req, res) => {
    try {
        const moods = await Mood.findAll();
        res.status(201).json(formatRes('success', moods))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getMoodById = async (req, res) => {
    try {

        // Check if id exists
        if (!req.params.id) res.status(404).json(formatRes('error', null, 'No id provided'))

        // Check if mood exists
        const mood = await Mood.findByPk(req.params.id);
        if (!mood) res.status(404).json(formatRes('sucess', null, 'No mood found with this id'))

        res.status(201).json(formatRes('success', mood))
    } catch (error) {
        res.status(500).json(formatRes('error', null, error.message))
    }
};