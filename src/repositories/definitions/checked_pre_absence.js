const { Sequelize, DataTypes, Model, ForeignKeyConstraintError, Op } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Exceptions = require('../../errors/repositoriesExceptions');

class CheckedPreAbsence extends Model {

}

CheckedPreAbsence.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    teacher_id: {
        type: DataTypes.STRING(16),
        allowNull: false
    }
    
},
    {
        sequelize,
        tableName: 'pre_absence'
    });

module.exports = CheckedPreAbsence;