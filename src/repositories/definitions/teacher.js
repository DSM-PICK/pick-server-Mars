const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Errors = require('../../errors/servicesExceptions');

let teachers = undefined;

class Teacher extends Model {
    static async findAllTeacher() {
        if(teachers == undefined) {
            teachers = await Teacher.findAll();
        }
        return teachers;
    }
    static async findAllByName(name) {
        const teachers = await Teacher.findAllTeacher();

        const finded_teachers = teachers.filter( (teacher) => {
            if(teacher.name.indexOf(name) != -1) {
                return true;
            }
        });

        if(!finded_teachers) {
            finded_teachers = await Teacher.findAll({ where: {name: { [Op.like]: name}}});
            teachers.contact(finded_teachers);
        }

        return finded_teachers;
    }
    static async findById(id) {
        const teacher_entity = await Teacher.findOne({where: {id: id}});
        if(!teacher_entity) {
            throw new Errors.NotFoundDataException;
        }
        return teacher_entity.dataValues;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
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