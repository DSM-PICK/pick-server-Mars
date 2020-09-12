const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../loaders/database');

class Club extends Model {}


Club.init({
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // location: {
    //     type: DataTypes.STRING(20),
    //     allowNull: false,
    // },
    // priority: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
},
{ 
    sequelize,
    tableName: 'club' });

module.exports = Club;