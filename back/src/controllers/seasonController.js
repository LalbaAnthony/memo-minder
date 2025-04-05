const {Season, Music, Person, Mood} = require('../models/index');

const baseController = require('./baseController');

const searchFields = ['title', 'description'];
const requiredFields = ['userId', 'title', 'color', 'dateStart'];

exports.getAllSeasons = baseController.getAll(Season, {
    searchFields,
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

exports.createSeason = baseController.create(Season, {
    requiredFields,
});

exports.updateSeason = baseController.update(Season, {
    requiredFields,
});

exports.deleteSeason = baseController.remove(Season);
