const { Music } = require('../models/index');

const baseController = require('./baseController');

const searchFields = ['title', 'artist', 'releaseDate', 'streamingLink'];
const requiredFields = ['userId', 'title'];

exports.getAllMusics = baseController.getAll(Music, {
    searchFields,
    defaultSort: [
        { order: 'DESC', orderBy: 'releaseDate' },
        { order: 'DESC', orderBy: 'createdAt' },
    ]
});

exports.getMusicById = baseController.getById(Music);

exports.createMusic = baseController.create(Music, {
    requiredFields,
});

exports.updateMusic = baseController.update(Music, {
    requiredFields,
});

exports.deleteMusic = baseController.remove(Music);
