const { Event, Music, Person, Mood, Season } = require('../database');

const baseController = require('./baseController');

const searchFields = ['title', 'description', 'location'];
const requiredFields = ['userId', 'title', 'date'];

exports.getAllEvents = baseController.getAll(Event, {
    searchFields,
    defaultSort: [
        { order: 'DESC', orderBy: 'date' },
        { order: 'ASC', orderBy: 'createdAt' },
    ],
    associations: [
        { model: Music, as: 'musics' },
        { model: Person, as: 'people' },
        { model: Season, as: 'seasons' },
        { model: Mood, as: 'mood' },
    ]
});

exports.getEventById = baseController.getById(Event, {
    associations: [
        { model: Music, as: 'musics' },
        { model: Person, as: 'people' },
        { model: Season, as: 'seasons' },
        { model: Mood, as: 'mood' },
    ]
});

exports.createEvent = baseController.create(Event, {
    requiredFields,
});

exports.updateEvent = baseController.update(Event, {
    requiredFields,
});

exports.deleteEvent = baseController.remove(Event);
