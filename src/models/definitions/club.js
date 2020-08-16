const { Sequelize, DataTypes, Model } = require('sequelize');
const { data } = require('../../loaders/logger');

class club extends Model {}


//todo setup the primary key. plz, do that next me.
club.init({
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
})