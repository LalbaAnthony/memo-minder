const sequelize = require('./src/config/database');
const Season = require('./src/models/season');

const seedData = async () => {
    try {
        // Synchroniser la base de données (supprimer toutes les tables existantes et les recréer)
        await sequelize.sync({ force: true });
        console.log('Database synchronized');

        // Données d'exemple
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

        // Insérer les données d'exemple
        await Season.bulkCreate(sampleSeasons);
        console.log('Sample data inserted');

        process.exit(0); // Terminer le script
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1); // Terminer le script avec une erreur
    }
};

seedData();
