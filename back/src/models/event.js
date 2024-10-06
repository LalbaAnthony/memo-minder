const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
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
        onDelete: 'SET NULL',  
        onUpdate: 'CASCADE'
    },
    musicId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Music',
            key: 'musicId'
        },
        allowNull: true,
    },
    moodId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Mood',
            key: 'moodId'
        },
        allowNull: true,
    },
    seasonId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Season',
            key: 'seasonId'
        },
        allowNull: true,
    },
    personId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Person',
            key: 'personId'
        },
        allowNull: true,
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
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    tableName: 'event',
});

module.exports = Event;
