const { DataTypes } = require('sequelize');
const sequelize = require('../config/database_development');

const User = require('../models/userModel');

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
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    streamingLink: {
        type: DataTypes.STRING(1000),
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
    tableName: 'music',
});

Music.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Music;
