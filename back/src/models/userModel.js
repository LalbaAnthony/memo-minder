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
        homePageEnableLastsEvents: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        homePageEnableLastsSeasons: {
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
        // Declared here rather than as `unique: true` on the column: with MySQL, every `sync({ alter: true })` re-adds a
        // column-level UNIQUE as a new index (email_2, email_3...) until the 64-index limit. Model indexes are synced by
        // name, so this one is created once. Named `email` to match the index MySQL created on existing databases.
        indexes: [
            { name: 'email', unique: true, fields: ['email'] },
        ],
    });

    return User;
};

