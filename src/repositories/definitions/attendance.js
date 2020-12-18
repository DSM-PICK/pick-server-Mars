const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../loaders/database');

class Attendance extends Model {
    static async updateAttendance(date, student, period, state) {
        return await Attendance.update({state: state}, {
            where: { date: date, student_num: student, period: period }
        });
    }

    static async updateAttendanceToMoving(date, student, period, memo) {
        return await Attendance.update({state: '이동', memo: memo}, {
            where: { date: date, student_num: student, period: period }
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
    memo: {
        type: DataTypes.STRING(80)
    },

},
    {
        sequelize,
        tableName: 'attendance'
    });

module.exports = Attendance;