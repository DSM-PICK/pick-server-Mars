const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../loaders/database');


let students = undefined;

class Student extends Model {
    static async findAllByNum(num) {
        const students = await Student.findAllStudent();
        const finded_students = students.filter( (student) => {
            if(String(student.num).indexOf(num) != -1) {
                return true;
            }
        });

        return finded_students;
    }

    static async findAllByName(name) {
        const students = await Student.findAllStudent();

        const finded_students = students.filter( (student) => {
            if(student.name.indexOf(name) != -1) {
                return true;
            }
        });

        return finded_students;
    }

    static async findAllByNumberAndName(num, name) {
        const students = await Student.findAllStudent();

        const finded_students = students.filter( (student) => {
            if(student.name.indexOf(name) != -1 && String(student.num).indexOf(num) != -1) {
                return true;
            }
        });
        return finded_students;
    }

    static async findAllStudent() {
        if(students == undefined) {
            const student_entities = await Student.findAll();
            students = student_entities.map((entity) => {
                return entity.dataValues;
            });
        }
        return students;
    }
}


Student.init({
    num: {
        type: DataTypes.CHAR(4),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    club_name: {
        type: DataTypes.STRING(20),
    },
    class_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
},
{ 
    sequelize,
    tableName: 'student' });

module.exports = Student;