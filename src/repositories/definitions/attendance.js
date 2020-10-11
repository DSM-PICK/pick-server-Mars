const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../loaders/database');

class Attendance extends Model {
    static async updateAttendance(id, state) {
        return await Attendance.update({id: id, state: state}, {
            where: { id: id }
        });
    }
}

Attendance.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    student_num: {
        type: DataTypes.CHAR(4),
        allowNull: false,
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    teacher_id: { type: DataTypes.STRING(16), allowNull: false },
    state: {
        type: DataTypes.CHAR(4),
        allowNull: false,
    },
},
    {
        sequelize,
        tableName: 'attendance'
    });

module.exports = Attendance;