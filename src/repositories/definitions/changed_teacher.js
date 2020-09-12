const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../loaders/database');

class ChangedTeacher extends Model {}


ChangedTeacher.init({
    id: {
        type: DataTypes.STRING(16),
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
    },
},
{ 
    sequelize,
    tableName: 'changed_teacher' });

module.exports = ChangedTeacher;