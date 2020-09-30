const Exceptions = require('../../errors/repositoriesExceptions');



class FakePriorAbsenceRepository {
    static async findPriorAbsenceByDate(date) {
        if(date.getTime() == new Date('2020-08-24').getTime()) {
            return [
                {
                    id: 1,
                    teacher_id: 'Kim',
                    start_date: new Date('2020-08-24'),
                    end_date: new Date('2020-08-24'),
                    student_num: 2411,
                    start_period: 7,
                    end_period: 10,
                }
            ];
        }
        throw new Exceptions.NotFoundDataException;
    }

    static async createPriorAbsence(teacher_id, student_num, term) {
        const teachers = require('./fakeTeacherRepository');
        if(student_num != 1111) {
            throw new Exceptions.NotFoundDataException;
        }

        try {
            await teachers.findById(teacher_id);
        }
        catch(e) {
            throw new Exceptions.NotFoundDataException;
        }
    }
}



module.exports = FakePriorAbsenceRepository;