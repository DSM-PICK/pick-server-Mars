const Exceptions = require('../../errors/servicesExceptions');

class StudentService {
    constructor(student_repository) {
        this.student_repository = student_repository;
    }

    async expect_by_input(input_data) {
        const datas = input_data.split(' ');
        if(datas.length > 2 || datas.length < 1) {
            throw new Exceptions.InvalidGivenDataException;
        }

        let number = undefined;
        let name = undefined;
        for(const data of datas) {
            if(isNaN(Number(data)) == false) {
                number = data;
            }
            else {
                name = data;
            }
        }


        let finded_students;
        if(number != undefined && datas.length == 2) {
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

        console.log(result);
        return result;
    }


}


module.exports = StudentService;