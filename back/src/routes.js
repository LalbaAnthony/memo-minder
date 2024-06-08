const express = require('express');
const seasonController = require('./controllers/season');
const router = express.Router();

// Seaons
router.get('/seasons', seasonController.getAllSeasons);
router.post('/seasons', seasonController.createSeason);

module.exports = router;
