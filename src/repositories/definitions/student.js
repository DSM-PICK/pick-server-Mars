const { Sequelize, DataTypes, Model } = require('sequelize');

class Student extends Model {}


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
{ tableName: 'student' });

module.exports = Student;