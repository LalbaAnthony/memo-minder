const Season = require('../models/seasonModel');
const Music = require('../models/musicModel');
const Person = require('../models/personModel');
const Mood = require('../models/moodModel');

const baseController = require('./baseController');

exports.getAllSeasons = baseController.getAll(Season, {
    searchFields: ['title', 'description', 'location'],
    defaultSort: [
        { order: 'DESC', orderBy: 'date' },
        { order: 'ASC', orderBy: 'createdAt' },
    ],
    associations: [
        { model: Music, as: 'music' },
        { model: Person, as: 'person' },
        { model: Mood, as: 'mood' },
    ]
});

exports.getSeasonById = baseController.getById(Season, {
    associations: [
        { model: Music, as: 'music' },
        { model: Person, as: 'person' },
        { model: Mood, as: 'mood' },
    ]
});

exports.createSeason = baseController.create(Season);

exports.updateSeason = baseController.update(Season);

exports.deleteSeason = baseController.remove(Season);
