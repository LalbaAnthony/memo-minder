const { Season, Music, Person, Mood, Event } = require('../database');

const baseController = require('../composables/baseController');

const searchFields = ['title', 'description'];
const requiredFields = ['userId', 'title', 'color', 'dateStart'];
const associations = [
    { model: Music, as: 'musics' },
    { model: Person, as: 'people' },
    { model: Event, as: 'events' },
    { model: Mood, as: 'mood' },
];
const toSetAssociations = ['musics', 'people', 'events'];

exports.getAllSeasons = baseController.getAll(Season, {
    searchFields,
    defaultSort: [
        { order: 'DESC', orderBy: 'date' },
        { order: 'ASC', orderBy: 'createdAt' },
    ],
    associations,
});

exports.getSeasonById = baseController.getById(Season, {
    associations,
});

exports.createSeason = baseController.create(Season, {
    requiredFields,
    toSetAssociations,
});

exports.updateSeason = baseController.update(Season, {
    requiredFields,
    toSetAssociations,
});

exports.deleteSeason = baseController.remove(Season);
