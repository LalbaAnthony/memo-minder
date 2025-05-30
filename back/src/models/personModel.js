const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Person = instance.define('Person', {
        personId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: instance.User,
                key: 'userId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        birthdate: {
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
        tableName: 'person',
        freezeTableName: true,
    });

    Person.associate = (models) => {
        Person.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Person.belongsToMany(models.Event, {
            through: "eventPerson",
            foreignKey: "personId",
            otherKey: "eventId",
            as: "events",
        });
        Person.belongsToMany(models.Season, {
            through: "seasonPerson",
            foreignKey: "personId",
            otherKey: "seasonId",
            as: "seasons",
        });
        Person.belongsToMany(models.Music, {
            through: "personMusic",
            foreignKey: "personId",
            otherKey: "musicId",
            as: "musics",
        });
    };

    return Person;
};
