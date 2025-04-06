const { Person, Music, Event, Season } = require('../database');

const baseController = require('./baseController');

const searchFields = ['name', 'description'];
const requiredFields = ['userId', 'name'];

exports.getAllPeople = baseController.getAll(Person, {
    searchFields,
    defaultSort: [
        { order: 'ASC', orderBy: 'name' },
        { order: 'DESC', orderBy: 'createdAt' },
    ],
    associations: [
        { model: Music, as: 'musics' },
        { model: Event, as: 'events' },
        { model: Season, as: 'seasons' },
    ]
});

exports.getPersonById = baseController.getById(Person, {
    associations: [
        { model: Music, as: 'musics' },
        { model: Event, as: 'events' },
        { model: Season, as: 'seasons' },
    ]
});

exports.createPerson = baseController.create(Person, {
    requiredFields,
});

exports.updatePerson = baseController.update(Person, {
    requiredFields,
});

exports.deletePerson = baseController.remove(Person);
