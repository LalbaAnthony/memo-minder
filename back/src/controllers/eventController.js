const Event = require('../models/eventModel');
const Music = require('../models/musicModel');
const Person = require('../models/personModel');
const Mood = require('../models/moodModel');
const Season = require('../models/seasonModel');

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
        { model: Music, as: 'music' },
        { model: Person, as: 'person' },
        { model: Mood, as: 'mood' },
        { model: Season, as: 'season' },
    ]
});

exports.getEventById = baseController.getById(Event, {
    associations: [
        { model: Music, as: 'music' },
        { model: Person, as: 'person' },
        { model: Mood, as: 'mood' },
        { model: Season, as: 'season' }
    ]
});

exports.createEvent = baseController.create(Event, {
    requiredFields,
});

exports.updateEvent = baseController.update(Event, {
    requiredFields,
});

exports.deleteEvent = baseController.remove(Event);
