const { Activity, Attendence, Class, Club, Teacher, Student } = require('./definitions');


// Activity - Teacher
Teacher.hasMany(Activity, {foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Teacher.hasMany(Activity, {foreignKey: "forth_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "second_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "third_floor_teacher_id", sourceKey: "id"});
Activity.belongsTo(Teacher, {foreignKey: "forth_floor_teacher_id", sourceKey: "id"});


// Attendence - Teacher
Teacher.hasMany(Attendence, {foreignKey: "teacher_id", sourceKey: "id"});
Attendence.belongsTo(Teacher, {foreignKey: "teacher_id", sourceKey: "id"});


// Attendence - Activity
Activity.hasMany(Attendence, {foreignKey: "date", sourceKey: "date"});
Attendence.belongsTo(Activity, {foreignKey: "date", sourceKey: "date"});


// Attendence - Student
Student.hasMany(Attendence, {foreignKey: "student_num", sourceKey: "num"});
Attendence.belongsTo(Student, {foreignKey: "student_num", sourceKey: "num"});


// Student - Club
Club.hasMany(Student, {foreignKey: "club_name", sourceKey: "name"});
Student.belongsTo(Club, {foreignKey: "club_name", sourceKey: "name"});


// Student - Class
Class.hasMany(Student, {foreignKey: "class_name", sourceKey: "name"});
Student.belongsTo(Class, {foreignKey: "class_name", sourceKey: "name"});

const { Op } = require("sequelize");

module.exports = {
    Activity,
    Attendence,
    Class,
    Club,
    Student,
    Teacher,
    Op
}