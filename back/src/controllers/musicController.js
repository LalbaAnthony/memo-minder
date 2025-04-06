const { Music, Event, Person, Season } = require('../database');

const baseController = require('./baseController');

const searchFields = ['title', 'artist', 'releaseDate', 'streamingLink'];
const requiredFields = ['userId', 'title'];

exports.getAllMusics = baseController.getAll(Music, {
    searchFields,
    defaultSort: [
        { order: 'DESC', orderBy: 'releaseDate' },
        { order: 'DESC', orderBy: 'createdAt' },
    ],
    associations: [
        { model: Event, as: 'events' },
        { model: Season, as: 'seasons' },
        { model: Person, as: 'people' },
    ]
});

exports.getMusicById = baseController.getById(Music, {
    associations: [
        { model: Event, as: 'events' },
        { model: Season, as: 'seasons' },
        { model: Person, as: 'people' },
    ]
});

exports.createMusic = baseController.create(Music, {
    requiredFields,
});

exports.updateMusic = baseController.update(Music, {
    requiredFields,
});

exports.deleteMusic = baseController.remove(Music);
