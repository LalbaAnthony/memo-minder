const { Person } = require('../database');

const baseController = require('./baseController');

const searchFields = ['name', 'description'];
const requiredFields = ['userId', 'name'];

exports.getAllPeople = baseController.getAll(Person, {
    searchFields,
    defaultSort: [
        { order: 'ASC', orderBy: 'name' },
        { order: 'DESC', orderBy: 'createdAt' },
    ]
});

exports.getPersonById = baseController.getById(Person);

exports.createPerson = baseController.create(Person, {
    requiredFields,
});

exports.updatePerson = baseController.update(Person, {
    requiredFields,
});

exports.deletePerson = baseController.remove(Person);
