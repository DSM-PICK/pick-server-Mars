const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../loaders/database');

class Class extends Model {}


Class.init({
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{ 
    sequelize,
    tableName: 'class' });

module.exports = Class;