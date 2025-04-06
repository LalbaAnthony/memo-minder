const { Music, Event, Person, Season } = require('../database');

const baseController = require('./baseController');

const searchFields = ['title', 'artist', 'releaseDate', 'streamingLink'];
const requiredFields = ['userId', 'title'];
const associations = [
    { model: Event, as: 'events' },
    { model: Season, as: 'seasons' },
    { model: Person, as: 'people' },
];
const toSetAssociations = ['events', 'seasons', 'people'];

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
    associations,
});

exports.createMusic = baseController.create(Music, {
    requiredFields,
    toSetAssociations,
});

exports.updateMusic = baseController.update(Music, {
    requiredFields,
    toSetAssociations,
});

exports.deleteMusic = baseController.remove(Music);
