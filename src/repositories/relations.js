const { Activity, Teacher, Student, ChangedTeacher, PreAbsence, Attendance } = require('./definitions');


// Activity - Teacher
Teacher.hasMany(Activity, {foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {foreignKey: "forth_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "forth_floor_teacher_id", sourceKey: "id"});


//Attendance - Activity
Activity.hasMany(Attendance, {foreignKey: 'date', sourceKey: 'date'});
Attendance.belongsTo(Activity, {foreignKey: 'date', sourceKey: 'date'});

//Attendance - Student
Student.hasMany(Attendance, {foreignKey: 'student_num', sourceKey: 'num'});
Attendance.belongsTo(Student, {foreignKey: 'student_num', sourceKey: 'num'});

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