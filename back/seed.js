const { sequelize, Season, Mood, Music, Person, Event, User } = require('./src/database');

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const logConsole = require('./src/helpers/logConsole')

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ? This script is meant to be run only once, to seed the database with sample data just for test purposes. It will drop all existing tables and recreate them, then insert the sample data.

const seedData = async () => {
    try {
        // Check the database connection
        await sequelize.authenticate();

        // Synchronize the database (drop all existing tables and recreate them)
        await sequelize.sync({ force: true });

        // Sample data for Mood table
        const sampleMoods = require('./src/seeds/moods.json');
        await Mood.bulkCreate(sampleMoods);
        logConsole('Moods data inserted', 'success');

        // Sample data for User table, with crypted passwords
        const sampleUsers = require('./src/seeds/users.json');
        for (const user of sampleUsers) user.password = await bcrypt.hash(user.password, 10);
        if (process.env.BACK_ENV && process.env.BACK_ENV === 'development') {
            await User.bulkCreate(sampleUsers);
            logConsole('Users data inserted', 'success');
        } else {
            logConsole('Users data skipped due to prod env', 'warn');
        }

        // Sample data for Music table
        const sampleMusics = require('./src/seeds/musics.json');
        if (process.env.BACK_ENV && process.env.BACK_ENV === 'development') {
            await Music.bulkCreate(sampleMusics);
            logConsole('Musics data inserted', 'success');
        } else {
            logConsole('Musics data skipped due to prod env', 'warn');
        }

        // Sample data for Person table
        const samplePeople = require('./src/seeds/people.json');
        if (process.env.BACK_ENV && process.env.BACK_ENV === 'development') {
            await Person.bulkCreate(samplePeople);
            logConsole('People data inserted', 'success');
        } else {
            logConsole('People data skipped due to prod env', 'warn');
        }

        // Sample data for Season table
        const sampleSeasons = require('./src/seeds/seasons.json');
        if (process.env.BACK_ENV && process.env.BACK_ENV === 'development') {
            await Season.bulkCreate(sampleSeasons);
            logConsole('Seasons data inserted', 'success');
        } else {
            logConsole('Seasons data skipped due to prod env', 'warn');
        }

        // Sample data for Event table
        const sampleEvents = require('./src/seeds/events.json');
        if (process.env.BACK_ENV && process.env.BACK_ENV === 'development') {
            await Event.bulkCreate(sampleEvents);
            logConsole('Sample data inserted', 'success');
        } else {
            logConsole('Sample data skipped due to prod env', 'warn');
        }

    } catch (error) {
        logConsole('Error seeding data', 'error');
        logConsole(error, 'error');
        throw error;
    }
};

const checkData = async () => {
    try {
        // Verify that the data has been inserted with a simple SELECT query
        const moods = await Mood.findAll();
        if (moods.length === 0) {
            logConsole('No moods found in the database', 'error');
        } else {
            logConsole('Sample data verified', 'success');
        }
    } catch (error) {
        logConsole(error, 'error');
    }
};

(async () => {
    try {
        await seedData();
        await checkData();
        logConsole('Data seeding completed', 'success');
        process.exit(0); // Terminate the script
    } catch (error) {
        logConsole('Error running the script', 'error');
        logConsole(error, 'error');
        process.exit(1); // Terminate the script with an error
    } finally {
        await sequelize.close(); // Ensure the connection is closed properly
    }
})();