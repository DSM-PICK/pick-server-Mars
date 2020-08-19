const { Sequelize, DataTypes, Model } = require('sequelize');

class Attendence extends Model {}


Attendence.init({
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    student_num: {
        type: DataTypes.CHAR(4),
        allowNull: false
    },
    period: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    teaacher_id: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    state: {
        type: DataTypes.CHAR(4),
        allowNull: false
    }
},
{ tableName: 'attendence' });

module.exports = Attendence;