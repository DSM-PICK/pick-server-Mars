const { Sequelize, DataTypes, Model } = require('sequelize');

class Teacher extends Model {}


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
    token: {
        type: DataTypes.STRING(200)
    },
},
{ tableName: 'teacher' });

module.exports = Teacher;