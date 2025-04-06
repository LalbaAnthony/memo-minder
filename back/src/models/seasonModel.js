const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Season = instance.define('Season', {
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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        // musicId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Music',
        //         key: 'musicId'
        //     },
        //     allowNull: true,
        //     onDelete: 'SET NULL',
        //     onUpdate: 'CASCADE'
        // },
        moodId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Mood',
                key: 'moodId'
            },
            allowNull: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        personId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Person',
                key: 'personId'
            },
            allowNull: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
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
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        dateEnd: {
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
        tableName: 'season',
    });

    Season.associate = (models) => {
        Season.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        // Season.belongsTo(models.Music, { foreignKey: 'musicId', as: 'music' });
        Season.belongsToMany(models.Music, {
            through: "seasonMusic",
            foreignKey: "seasonId",
            otherKey: "musicId",
            as: "musics",
        });
        Season.belongsTo(models.Mood, { foreignKey: 'moodId', as: 'mood' });
        Season.belongsTo(models.Person, { foreignKey: 'personId', as: 'person' });
    };

    return Season;
};