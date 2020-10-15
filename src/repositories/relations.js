const { Activity, Teacher, Student, ChangedTeacher, PreAbsence, Attendance } = require('./definitions');


// Activity - Teacher
Teacher.hasMany(Activity, {as: 'floor2', foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {as: 'floor3', foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {as: 'floor4', foreignKey: "forth_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {as: 'floor2', foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {as: 'floor3', foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {as: 'floor4', foreignKey: "forth_floor_teacher_id", sourceKey: "id"});


//Attendance - Activity
Activity.hasMany(Attendance, {foreignKey: 'date', sourceKey: 'date'});
Attendance.belongsTo(Activity, {foreignKey: 'date', sourceKey: 'date'});

//Attendance - Student
Student.hasMany(Attendance, {as: 'student', foreignKey: 'student_num', sourceKey: 'num'});
Attendance.belongsTo(Student, {as: 'student', foreignKey: 'student_num', sourceKey: 'num'});

//Attendance - Teacher
Teacher.hasMany(Attendance, {foreignKey: 'teacher_id', sourceKey: 'id'});
Attendance.belongsTo(Teacher, {foreignKey: 'teacher_id', sourceKey: 'id'});


const { Op } = require("sequelize");

module.exports = {
    Activity,
    Student,
    Teacher,
    ChangedTeacher,
    PreAbsence,
    Attendance
}