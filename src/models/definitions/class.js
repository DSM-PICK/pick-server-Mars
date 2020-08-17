const { Sequelize, DataTypes, Model } = require('sequelize');

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
{ tableName: 'class' });

module.exports = Class;