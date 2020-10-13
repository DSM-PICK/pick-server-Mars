const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Errors = require('../../errors/repositoriesExceptions');

class Teacher extends Model {
    static async findById(id) {
        const teacher_entity = await Teacher.findOne({where: {id: id}});
        if(!teacher_entity) {
            throw new Errors.NotFoundDataException;
        }
        return teacher_entity.dataValues;
    }
}


Teacher.init({
    id: {
        type: DataTypes.STRING(16),
        allowNull: false,
        primaryKey: true
    },
    pw: {
        type: DataTypes.CHAR(128),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    office: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
},
{ 
    sequelize,
    tableName: 'teacher' });

module.exports = Teacher;