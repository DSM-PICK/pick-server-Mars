const { Sequelize, DataTypes, Model } = require('sequelize');
const { data } = require('../../loaders/logger');

class club extends Model {}


club.init({
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = club;