const { Sequelize, DataTypes, Model } = require('sequelize');

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
    location: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{ tableName: 'club' });

module.exports = Club;