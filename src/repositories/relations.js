const { Activity, Teacher, Student, ChangedTeacher, PreAbsence } = require('./definitions');


// Activity - Teacher
Teacher.hasMany(Activity, {foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {foreignKey: "forth_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "forth_floor_teacher_id", sourceKey: "id"});


const { Op } = require("sequelize");

module.exports = {
    Activity,
    Student,
    Teacher,
    ChangedTeacher,
    PreAbsence
}