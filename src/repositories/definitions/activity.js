const { Sequelize, DataTypes, Model } = require('sequelize');

class Activity extends Model {}


Activity.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
    },
    schedule: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    second_floor_teacher_id: {
        type: DataTypes.STRING(16)
    },
    third_floor_teacher_id: {
        type: DataTypes.STRING(16)
    },
    forth_floor_teacher_id: {
        type: DataTypes.STRING(16)
    },
},
{ tableName: 'activity' });

module.exports = Activity;