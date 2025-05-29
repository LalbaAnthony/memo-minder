const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const User = instance.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        homePageEnableSpents: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        homePageEnableStats: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        homePageEnableQuote: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        homePageEnableLasts: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        homePageEnableUpcomings: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        streamingPlatform: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        validateEmailToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetPasswordCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        hasValidatedEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'en-US',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastLogin: {
            type: DataTypes.DATEONLY,
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
        tableName: 'user',
        freezeTableName: true,
    });

    return User;
};

