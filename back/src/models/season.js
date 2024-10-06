const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Season = sequelize.define('Season', {
    seasonId: {
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
    personId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Person',
            key: 'personId'
        },
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false,
        defaultValue: '#000000',
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateEnd: {
        type: DataTypes.DATE,
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
    tableName: 'season',
});

module.exports = Season;
