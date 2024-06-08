const sequelize = require('./src/config/database');
const Season = require('./src/models/season');
const Mood = require('./src/models/mood');
const Music = require('./src/models/music');
const Person = require('./src/models/person');
const Event = require('./src/models/event');
const User = require('./src/models/user');

const seedData = async () => {
    try {
        // Synchronize the database (drop all existing tables and recreate them)
        await sequelize.sync({ force: true });
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

        // Insert sample data for Mood table
        await Mood.bulkCreate(sampleMoods);
        console.log('Sample data for Mood inserted');

        // Sample data for Music table
        const sampleMusics = [
            {
                title: 'Song 1',
                artist: 'Artist 1',
                release_date: '2021-01-01',
                streaming_link: 'https://example.com/song1',
            },
            {
                title: 'Song 2',
                artist: 'Artist 2',
                release_date: '2021-02-01',
                streaming_link: 'https://example.com/song2',
            },
        ];

        // Insert sample data for Music table
        await Music.bulkCreate(sampleMusics);
        console.log('Sample data for Music inserted');

        // Sample data for Person table
        const samplePersons = [
            {
                name: 'Person 1',
                description: 'Description for Person 1',
            },
            {
                name: 'Person 2',
                description: 'Description for Person 2',
            },
        ];

        // Insert sample data for Person table
        await Person.bulkCreate(samplePersons);
        console.log('Sample data for Person inserted');

        // Sample data for User table
        const sampleUsers = [
            {
                pseudo: 'user1',
                email: 'user1@example.com',
                password: 'password1',
            },
            {
                pseudo: 'user2',
                email: 'user2@example.com',
                password: 'password2',
            },
        ];

        // Insert sample data for User table
        await User.bulkCreate(sampleUsers);
        console.log('Sample data for User inserted');

        // Sample data for Event table
        const sampleEvents = [
            {
                music_id: 1,
                user_id: 1,
                season_id: 1,
                title: 'Event 1',
                description: 'Description for Event 1',
                date: '2021-06-22',
                location: 'Location 1',
            },
            {
                music_id: 2,
                user_id: 2,
                season_id: 2,
                title: 'Event 2',
                description: 'Description for Event 2',
                date: '2021-12-22',
                location: 'Location 2',
            },
        ];

        // Insert sample data for Event table
        await Event.bulkCreate(sampleEvents);
        console.log('Sample data for Event inserted');

        // Sample data for Season table (already included in the original seeder)

        const sampleSeasons = [
            {
                user_id: 1,
                music_id: 1,
                mood_id: 1,
                person_id: 1,
                title: 'Summer 2021',
                color: '#FF0000',
                description: 'This is a description',
                date_start: '2021-06-21',
                date_end: '2021-09-22',
                updated_at: new Date(),
                created_at: new Date(),
            },
            {
                user_id: 1,
                music_id: 2,
                mood_id: 2,
                person_id: 2,
                title: 'Winter 2021',
                color: '#00FF00',
                description: 'This is a description',
                date_start: '2021-12-21',
                date_end: '2022-03-20',
                updated_at: new Date(),
                created_at: new Date(),
            },
        ];

        // Insert sample data for Season table
        await Season.bulkCreate(sampleSeasons);
        console.log('Sample data for Season inserted');

        console.log('Sample data insertion completed');

        process.exit(0); // Terminate the script
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1); // Terminate the script with an error
    }
};

seedData();
