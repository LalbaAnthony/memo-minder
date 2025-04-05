const frmtr = require('../helpers/frmtr')

const { Mood } = require('../models/index');

exports.getAllMoods = async (req, res) => {
    try {
        const moods = await Mood.findAll();
        return res.status(200).json(frmtr('success', moods))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.getMoodById = async (req, res) => {
    try {
        // Check if the id is provided
        if (!req.params.id)
            return res.status(400).json(frmtr('error', null, 'No id provided'));

        // Check if the mood exists
        const mood = await Mood.findByPk(parseInt(req.params.id));
        if (!mood)
            return res.status(404).json(frmtr('error', null, 'No mood found with this id'));

        return res.status(200).json(frmtr('success', mood))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};