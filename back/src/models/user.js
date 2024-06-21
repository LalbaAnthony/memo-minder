const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    connection_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    validate_email_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reset_password_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    has_validated_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
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
    tableName: 'user',
});

module.exports = User;
