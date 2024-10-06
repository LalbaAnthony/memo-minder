const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Music = sequelize.define('Music', {
    musicId: {
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    streamingLink: {
        type: DataTypes.STRING,
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
    tableName: 'music',
});

module.exports = Music;
