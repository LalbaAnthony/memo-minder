const frmtr = require('../helpers/frmtr')

const Mood = require('../models/moodModel');

exports.getAllMoods = async (req, res) => {
    try {
        const moods = await Mood.findAll();
        res.status(200).json(frmtr('success', moods))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.getMoodById = async (req, res) => {
    try {
        // Check if mood exists
        if (!req.params.id) res.status(400).json(frmtr('error', null, 'No id provided'));
        const mood = await Mood.findByPk(parseInt(req.params.id));
        if (!mood) res.status(404).json(frmtr('error', null, 'No mood found with this id'));

        res.status(200).json(frmtr('success', mood))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};