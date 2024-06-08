const express = require('express');

const eventController = require('./controllers/event');
const moodController = require('./controllers/mood');
const musicController = require('./controllers/music');
const personController = require('./controllers/person');
const seasonController = require('./controllers/season');
const userController = require('./controllers/user');

const router = express.Router();

// Event
router.get('/events', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventById);
router.post('/events', eventController.createEvent);
router.put('/event/:id', eventController.updateEvent);

// Mood
router.get('/moods', moodController.getAllMoods);
router.get('/mood/:id', moodController.getMoodById);
router.post('/moods', moodController.createMood);
router.put('/mood/:id', moodController.updateMood);

// Music
router.get('/musics', musicController.getAllMusics);
router.get('/music/:id', musicController.getMusicById);
router.post('/musics', musicController.createMusic);
router.put('/music/:id', musicController.updateMusic);

// Person
router.get('/people', personController.getAllPeople);
router.get('/person/:id', personController.getPersonById);
router.post('/people', personController.createPerson);
router.put('/person/:id', personController.updatePerson);

// Seaons
router.get('/seasons', seasonController.getAllSeasons);
router.get('/season/:id', seasonController.getSeasonById);
router.post('/seasons', seasonController.createSeason);
router.put('/season/:id', seasonController.updateSeason);

// User
// router.get('/users', userController.getAllUsers);
// router.get('/user/:id', userController.getUserById);
// router.post('/users', userController.createUser);
// router.put('/user/:id', userController.updateUser);

module.exports = router;
