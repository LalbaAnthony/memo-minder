const { Person, Music, Event, Season } = require('../database');

const baseController = require('../composables/baseController');

const searchFields = ['name', 'description'];
const requiredFields = ['userId', 'name'];
const associations = [
    { model: Music, as: 'musics' },
    { model: Event, as: 'events' },
    { model: Season, as: 'seasons' },
];
const toSetAssociations = ['musics', 'events', 'seasons'];

exports.getAllPeople = baseController.getAll(Person, {
    searchFields,
    defaultSort: [
        { order: 'ASC', orderBy: 'name' },
        { order: 'DESC', orderBy: 'createdAt' },
    ],
    associations,
});

exports.getPersonById = baseController.getById(Person, {
    associations,
});

exports.createPerson = baseController.create(Person, {
    requiredFields,
    toSetAssociations,
});

exports.updatePerson = baseController.update(Person, {
    requiredFields,
    toSetAssociations,
});

exports.deletePerson = baseController.remove(Person);
