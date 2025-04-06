const { Event, Music, Person, Mood, Season } = require('../database');

const baseController = require('../composables/baseController');

const searchFields = ['title', 'description', 'location'];
const requiredFields = ['userId', 'title', 'date'];
const associations = [
    { model: Music, as: 'musics' },
    { model: Person, as: 'people' },
    { model: Season, as: 'seasons' },
    { model: Mood, as: 'mood' },
];
const toSetAssociations = ['musics', 'people', 'seasons'];

exports.getAllEvents = baseController.getAll(Event, {
    searchFields,
    defaultSort: [
        { order: 'DESC', orderBy: 'date' },
        { order: 'ASC', orderBy: 'createdAt' },
    ],
    associations,
});

exports.getEventById = baseController.getById(Event, {
    associations,
});

exports.createEvent = baseController.create(Event, {
    requiredFields,
    toSetAssociations,
});

exports.updateEvent = baseController.update(Event, {
    requiredFields,
    toSetAssociations,
});

exports.deleteEvent = baseController.remove(Event);
