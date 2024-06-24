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
router.delete('/event/:id', eventController.deleteEvent);

// Mood
router.get('/moods', moodController.getAllMoods);
router.get('/mood/:id', moodController.getMoodById);

// Music
// router.get('/musics', musicController.getAllMusics);
// router.get('/music/:id', musicController.getMusicById);
// router.post('/musics', musicController.createMusic);
// router.put('/music/:id', musicController.updateMusic);
// router.delete('/music/:id', musicController.deleteMusic);

// Person
// router.get('/people', personController.getAllPeople);
// router.get('/person/:id', personController.getPersonById);
// router.post('/people', personController.createPerson);
// router.put('/person/:id', personController.updatePerson);
// router.delete('/person/:id', personController.deletePerson);

// Seaons
// router.get('/seasons', seasonController.getAllSeasons);
// router.get('/season/:id', seasonController.getSeasonById);
// router.post('/seasons', seasonController.createSeason);
// router.put('/season/:id', seasonController.updateSeason);
// router.delete('/season/:id', seasonController.deleteSeason);

// User
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/verify-email', userController.verifyEmail);
router.get('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.get('/user-infos/:id', userController.userInfos);
router.post('/validate-token', userController.validateToken);

module.exports = router;
