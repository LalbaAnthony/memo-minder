const eventController = require('./controllers/eventController');
const moodController = require('./controllers/moodController');
const musicController = require('./controllers/musicController');
const personController = require('./controllers/personController');
const seasonController = require('./controllers/seasonController');
const userController = require('./controllers/userController');

const checkToken = require('./middlewares/auth');

const express = require('express');
const router = express.Router();

// Event
router.get('/events', checkToken, eventController.getAllEvents);
router.get('/event/:id', checkToken, eventController.getEventById);
router.post('/events', checkToken, eventController.createEvent);
router.put('/event/:id', checkToken, eventController.updateEvent);
router.delete('/event/:id', checkToken, eventController.deleteEvent);

// Mood
router.get('/moods', moodController.getAllMoods);
router.get('/mood/:id', moodController.getMoodById);

// Music
router.get('/musics', checkToken, musicController.getAllMusics);
router.get('/music/:id', checkToken, musicController.getMusicById);
router.post('/musics', checkToken, musicController.createMusic);
router.put('/music/:id', checkToken, musicController.updateMusic);
router.delete('/music/:id', checkToken, musicController.deleteMusic);

// Person
router.get('/people', checkToken, personController.getAllPeople);
router.get('/upcoming-birthdays', checkToken, personController.getUpcommingBirthdaysPeople);
router.get('/person/:id', checkToken, personController.getPersonById);
router.post('/people', checkToken, personController.createPerson);
router.put('/person/:id', checkToken, personController.updatePerson);
router.delete('/person/:id', checkToken, personController.deletePerson);

// Seasons
router.get('/seasons', checkToken, seasonController.getAllSeasons);
router.get('/season/:id', checkToken, seasonController.getSeasonById);
router.post('/seasons', checkToken, seasonController.createSeason);
router.put('/season/:id', checkToken, seasonController.updateSeason);
router.delete('/season/:id', checkToken, seasonController.deleteSeason);

// User
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/verify-email', userController.verifyEmail);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.get('/user/:id', checkToken, userController.userInfos);
router.put('/user/:id', checkToken, userController.userUpdate);
router.delete('/user/:id', checkToken, userController.userDelete);

module.exports = router;
