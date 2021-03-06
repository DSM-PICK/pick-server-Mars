const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const { sequelize } = require('../../loaders/database');

class Attendance extends Model {
    static async updateAttendance(date, student, period, state, reason) {
        return await Attendance.update({state: state, reason: reason, memo: null}, {
            where: { date: date, student_num: student, period: period, state: { [Op.not]: '기초학력'} }
        });
    }

    static async updateAttendanceToMoving(date, student, period, memo) {
        return await Attendance.update({state: '이동', memo: memo, reason: null}, {
            where: { date: date, student_num: student, period: period, state: { [Op.not]: '기초학력'} }
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
    reason: {
        type: DataTypes.STRING(80)
    },
},
    {
        sequelize,
        tableName: 'attendance'
    });

module.exports = Attendance;