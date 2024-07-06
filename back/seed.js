const bcrypt = require('bcrypt');

const sequelize = require('./src/config/database');

const Season = require('./src/models/season');
const Mood = require('./src/models/mood');
const Music = require('./src/models/music');
const Person = require('./src/models/person');
const Event = require('./src/models/event');
const User = require('./src/models/user');

// ? This script is meant to be run only once, to seed the database with sample data just for test purposes. It will drop all existing tables and recreate them, then insert the sample data.
// ? This file should remain a standalone script, not part of the main application.

const seedData = async () => {
    try {
        // Check the database connection
        await sequelize.authenticate();

        // Drop database tables
        await sequelize.query('PRAGMA foreign_keys = OFF'); // Disable foreign key checks
        await Event.drop();
        await Season.drop();
        await Person.drop();
        await Music.drop();
        await User.drop();
        await Mood.drop();
        await sequelize.query('PRAGMA foreign_keys = ON'); // Re-enable foreign key checks

        // Synchronize the database (drop all existing tables and recreate them)
        await sequelize.sync({ force: true });
        console.log('Database synchronized');

        // Sample data for Mood table
        const sampleMoods = [
            {
                moodId: 1,
                name: 'Joy',
                color: '#ECA608', // Yellow
            },
            {
                moodId: 2,
                name: 'Anger',
                color: '#A00F05', // Red
            },
            {
                moodId: 3,
                name: 'Sadness',
                color: '#1D4396', 
            },
            {
                moodId: 4,
                name: 'Ennui',
                color: '#413BB5', 
            },
            {
                moodId: 5,
                name: 'Disgust',
                color: '#3E992C', 
            },
            {
                moodId: 6,
                name: 'Fear',
                color: '#612D91', 
            },
            {
                moodId: 7,
                name: 'Anxiety',
                color: '#DB6415', 
            },
            {
                moodId: 8,
                name: 'Envy',
                color: '#0F9D91', 
            },
            {
                moodId: 9,
                name: 'Embarassment',
                color: '#D53893', 
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
                userId: 1,
                username: 'jdoe',
                birthdate: '1990-01-01',
                email: 'j.doe@test.com',
                password: 'password',
                language: 'en',
                hasValidatedEmail: true,
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
                musicId: 1,
                userId: 1,
                title: 'Hasarder',
                artist: 'Lompal',
                releaseDate: '2022-09-16',
                streamingLink: 'https://open.spotify.com/track/6V40xLcDlYwZpz3oKIVNhL?si=e5c24c7bb393460c'
            },
            {
                musicId: 2,
                userId: 1,
                title: 'To live is to die',
                artist: 'Metallica',
                releaseDate: '1988-07-07',
                streamingLink: 'https://www.youtube.com/watch?v=k7_hwgD1ugg'
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
                personId: 1,
                userId: 1,
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
                seasonId: 1,
                userId: 1,
                personId: 1,
                musicId: 1,
                moodId: 1,
                title: 'Summer 2022',
                color: '#FF0000',
                description: 'The best season of the year',
                dateStart: '2022-06-21',
                dateEnd: '2022-09-23',
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
                eventId: 1,
                userId: 1,
                musicId: 1,
                seasonId: 1,
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
        
        // Verify that the data has been inserted with a SELECT query
        try {
            const events = await Event.findAll();
            console.log('All Events:', JSON.stringify(events, null, 2));
            if (events.length === 0) {
                console.log('❌ Error seeding data ❌');
                console.error('No events found in the database');
                process.exit(1); // Terminate the script with an error
            }
        } catch (error) {
            console.error('Error fetching all events:', error);
        }

        console.log('✅ Data seeding completed ✅');
        process.exit(0); // Terminate the script
    } catch (error) {
        console.log('❌ Error seeding data ❌');
        console.error(error);
        process.exit(1); // Terminate the script with an error
    } finally {
        await sequelize.close();
    }
};

seedData();
