const bcrypt = require('bcrypt');

const database = require('../config/database');
const Season = require('../models/season');
const Mood = require('../models/mood');
const Music = require('../models/music');
const Person = require('../models/person');
const Event = require('../models/event');
const User = require('../models/user');

// ? This script is meant to be run only once, to seed the database with sample data just for test purposes. It will drop all existing tables and recreate them, then insert the sample data.
// ? This file should remain a standalone script, not part of the main application.

const seedData = async () => {
    try {
        // Synchronize the database (drop all existing tables and recreate them)
        await database.sync({ force: true });
        console.log('Database synchronized');

        // Sample data for Mood table
        const sampleMoods = [
            {
                name: 'Happy',
                color: '#FF0000',
            },
            {
                name: 'Sad',
                color: '#0000FF',
            },
        ];

        try {
            await Mood.bulkCreate(sampleMoods);
            console.log('Sample data for Mood inserted');
        } catch (error) {
            console.error('Error inserting sample data for Mood:', error);
        }

        // Sample data for User table, with crypted passwords
        const sampleUsers = [
            {
                user_id: 1,
                pseudo: 'jdoe',
                email: 'John Doe',
                password: 'password',
                language: 'en',
                has_validated_email: true,
            },
        ];

        try {
            for (const user of sampleUsers) {
                user.password = await bcrypt.hash(user.password, 10);
            }

            await User.bulkCreate(sampleUsers);
            console.log('Sample data for User inserted');
        } catch (error) {
            console.error('Error inserting sample data for User:', error);
        }

        // Sample data for Music table
        const sampleMusics = [
            {
                music_id: 1,
                user_id: 1,
                title: 'Hasarder',
                artist: 'Lompal',
                release_date: '2022-09-16',
                streaming_link: 'https://open.spotify.com/track/6V40xLcDlYwZpz3oKIVNhL?si=e5c24c7bb393460c'
            },
            {
                music_id: 2,
                user_id: 1,
                title: 'To live is to die',
                artist: 'Metallica',
                release_date: '1988-07-07',
                streaming_link: 'https://www.youtube.com/watch?v=k7_hwgD1ugg'
            },
        ];

        try {
            await Music.bulkCreate(sampleMusics);
            console.log('Sample data for Music inserted');
        } catch (error) {
            console.error('Error inserting sample data for Music:', error);
        }

        // Sample data for Person table
        const samplePersons = [
            {
                person_id: 1,
                user_id: 1,
                name: 'Smith',
                description: 'This man is a legend',
            },
        ];

        try {
            await Person.bulkCreate(samplePersons);
            console.log('Sample data for Person inserted');
        } catch (error) {
            console.error('Error inserting sample data for Person:', error);
        }

        // Sample data for Season table
        const sampleSeasons = [
            {
                season_id: 1,
                user_id: 1,
                person_id: 1,
                music_id: 1,
                mood_id: 1,
                title: 'Summer 2022',
                color: '#FF0000',
                description: 'The best season of the year',
                date_start: '2022-06-21',
                date_end: '2022-09-23',
            },
        ];

        try {
            await Season.bulkCreate(sampleSeasons);
            console.log('Sample data for Season inserted');
        } catch (error) {
            console.error('Error inserting sample data for Season:', error);
        }

        // Sample data for Event table
        const sampleEvents = [
            {
                event_id: 1,
                user_id: 1,
                music_id: 1,
                season_id: 1,
                title: 'Summer party',
                description: 'The best party of the year',
                date: '2022-08-15',
                location: 'Paris',
            },
        ];

        try {
            await Event.bulkCreate(sampleEvents);
            console.log('Sample data for Event inserted');
        } catch (error) {
            console.error('Error inserting sample data for Event:', error);
        }

        console.log('✅ Sample data insertion completed ✅');

        process.exit(0); // Terminate the script
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1); // Terminate the script with an error
    }
};

seedData();
