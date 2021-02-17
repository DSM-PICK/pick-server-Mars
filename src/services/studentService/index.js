const Exceptions = require('../../errors/servicesExceptions');

class StudentService {
    constructor(student_repository) {
        this.student_repository = student_repository;
    }

    async expect_by_input(number, name) {
        let finded_students;
        if(number != undefined && name != undefined) {
            finded_students = await this.student_repository.findAllByNumberAndName(number, name);
        }
        else if(number != undefined) {
            finded_students = await this.student_repository.findAllByNum(number);
        }
        else {
            finded_students = await this.student_repository.findAllByName(name);
        }

        const result = finded_students.map((student) => {
            return student.num + ' ' + student.name;
        });

        return result;
    }


}


module.exports = StudentService;