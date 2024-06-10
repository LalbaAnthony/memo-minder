const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Season = sequelize.define('Season', {
    season_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        },
        onDelete: 'CASCADE',
    },
    music_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Music',
            key: 'music_id'
        },
        allowNull: true,
    },
    mood_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Mood',
            key: 'mood_id'
        },
        allowNull: true,
    },
    person_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Person',
            key: 'person_id'
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
    date_start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    tableName: 'season',
});

module.exports = Season;
