const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Mood = instance.define('Mood', {
        moodId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '#000000',
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
        tableName: 'mood',
    });

    return Mood;
};