const bcrypt = require('bcrypt');

const { sequelize, Season, Mood, Music, Person, Event, User } = require('./src/database');

// Importing helpers
const logConsole = require('./src/helpers/logConsole')

// ? This script is meant to be run only once, to seed the database with sample data just for test purposes. It will drop all existing tables and recreate them, then insert the sample data.

const seedData = async () => {
    try {
        // Check the database connection
        await sequelize.authenticate();

        // Drop database tables (disable and re-enable foreign key checks)
        await Event.drop();
        await Season.drop();
        await Person.drop();
        await Music.drop();
        await User.drop();
        await Mood.drop();

        // Synchronize the database (drop all existing tables and recreate them)
        await sequelize.sync({ force: true });

        // Sample data for User table, with crypted passwords
        const sampleUsers = require('./src/seeds/users.json');
        for (const user of sampleUsers) user.password = await bcrypt.hash(user.password, 10);
        await User.bulkCreate(sampleUsers);

        // Sample data for Mood table
        const sampleMoods = require('./src/seeds/moods.json');
        await Mood.bulkCreate(sampleMoods);

        // Sample data for Music table
        const sampleMusics = require('./src/seeds/musics.json');
        await Music.bulkCreate(sampleMusics);

        // Sample data for Person table
        const samplePeople = require('./src/seeds/people.json');
        await Person.bulkCreate(samplePeople);

        // Sample data for Season table
        const sampleSeasons = require('./src/seeds/seasons.json');
        await Season.bulkCreate(sampleSeasons);

        // Sample data for Event table
        const sampleEvents = require('./src/seeds/events.json');
        await Event.bulkCreate(sampleEvents);

        logConsole('Sample data inserted', 'success');
    } catch (error) {
        logConsole('Error seeding data', 'error');
        logConsole(error, 'error');
        throw error;
    }
};

const checkData = async () => {
    try {
        // Verify that the data has been inserted with a SELECT query
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