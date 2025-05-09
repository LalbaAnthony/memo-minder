const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Music = instance.define('Music', {
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
                model: instance.User,
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
        freezeTableName: true,
    });
    
    Music.associate = (models) => {
        Music.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Music.belongsToMany(models.Season, {
            through: "seasonMusic",
            foreignKey: "musicId",
            otherKey: "seasonId",
            as: "seasons",
        });
        Music.belongsToMany(models.Event, {
            through: "eventMusic",
            foreignKey: "musicId",
            otherKey: "eventId",
            as: "events",
        });
        Music.belongsToMany(models.Person, {
            through: "personMusic",
            foreignKey: "musicId",
            otherKey: "personId",
            as: "people",
        });
    };

    return Music;
};
