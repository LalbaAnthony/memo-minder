const { Season, Music, Person, Mood, Event } = require('../database');
const { Op } = require('sequelize');
const frmtr = require('../helpers/frmtr');
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
        { order: 'DESC', orderBy: 'dateStart' },
        { order: 'DESC', orderBy: 'createdAt' },
    ],
    associations,
});

exports.getCurrentSeason = async (req, res) => {
    let { userId } = req.query;
    if (!userId)
        return res.status(400).json(frmtr('error', null, 'Missing fields: userId'));

    let where = { userId };

    where = {
        ...where,
        dateStart: { [Op.lte]: new Date() },
        dateEnd: { [Op.gte]: new Date() },
    };

    const items = await Season.findAll({ where });
    
    res.status(200).json(frmtr('success', items, null));
};

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
