const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Event = instance.define('Event', {
        eventId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        musicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Music',
                key: 'musicId'
            },
            allowNull: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        moodId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Mood',
                key: 'moodId'
            },
            allowNull: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        seasonId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Season',
                key: 'seasonId'
            },
            allowNull: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        personId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Person',
                key: 'personId'
            },
            allowNull: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
        tableName: 'event',
    });
    Event.associate = (models) => {
        Event.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Event.belongsTo(models.Music, { foreignKey: 'musicId', as: 'music' });
        Event.belongsTo(models.Person, { foreignKey: 'personId', as: 'person' });
        Event.belongsTo(models.Mood, { foreignKey: 'moodId', as: 'mood' });
        Event.belongsTo(models.Season, { foreignKey: 'seasonId', as: 'season' });
    };

    return Event;
};