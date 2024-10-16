// Import modules
const bcrypt = require('bcrypt');

// Import config
const sequelize = require('./src/config/database');

// Importing models
const Season = require('./src/models/season');
const Mood = require('./src/models/mood');
const Music = require('./src/models/music');
const Person = require('./src/models/person');
const Event = require('./src/models/event');
const User = require('./src/models/user');

// Importing helpers
const logConsole = require('./src/helpers/logConsole')

// ? This script is meant to be run only once, to seed the database with sample data just for test purposes. It will drop all existing tables and recreate them, then insert the sample data.

const seedData = async () => {
    try {
        // Check the database connection
        await sequelize.authenticate();

        // Drop database tables (disable and re-enable foreign key checks)
        await sequelize.query('PRAGMA foreign_keys = OFF');
        await Event.drop();
        await Season.drop();
        await Person.drop();
        await Music.drop();
        await User.drop();
        await Mood.drop();
        await sequelize.query('PRAGMA foreign_keys = ON');

        // Synchronize the database (drop all existing tables and recreate them)
        await sequelize.sync({ force: true });

        // Sample data for User table, with crypted passwords
        const sampleUsers = require('./src/seed_data/users.json');
        for (const user of sampleUsers) user.password = await bcrypt.hash(user.password, 10);
        await User.bulkCreate(sampleUsers);

        // Sample data for Mood table
        const sampleMoods = require('./src/seed_data/moods.json');
        await Mood.bulkCreate(sampleMoods);

        // Sample data for Music table
        const sampleMusics = require('./src/seed_data/musics.json');
        await Music.bulkCreate(sampleMusics);

        // Sample data for Person table
        const samplePeople = require('./src/seed_data/people.json');
        await Person.bulkCreate(samplePeople);

        // Sample data for Season table
        const sampleSeasons = require('./src/seed_data/seasons.json');
        await Season.bulkCreate(sampleSeasons);

        // Sample data for Event table
        const sampleEvents = require('./src/seed_data/events.json');
        await Event.bulkCreate(sampleEvents);

        logConsole('Sample data inserted');
    } catch (error) {
        logConsole('❌ Error seeding data ❌');
        logConsole(error, 'error');
        throw error;
    }
};

const checkData = async () => {
    try {
        // Verify that the data has been inserted with a SELECT query
        const events = await Event.findAll();
        if (events.length === 0) {
            console.error('No events found in the database');
        } else {
            logConsole('Sample data verified');
        }
    } catch (error) {
        logConsole(error, 'error');
    }
};

(async () => {
    try {
        await seedData();
        await checkData();
        logConsole('✅ Data seeding completed ✅');
        process.exit(0); // Terminate the script
    } catch (error) {
        logConsole('❌ Error running the script ❌');
        logConsole(error, 'error');
        process.exit(1); // Terminate the script with an error
    } finally {
        await sequelize.close(); // Ensure the connection is closed properly
    }
})();