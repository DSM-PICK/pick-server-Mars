const Exceptions = require('../../errors/repositoriesExceptions');



class FakePreAbsenceRepository {
    static async findPreAbsenceByDate(date) {
        if(date.getTime() == new Date('2020-08-24').getTime()) {
            return [
                {
                    id: 1,
                    teacher_id: 'Kim',
                    start_date: new Date('2020-08-24'),
                    end_date: new Date('2020-08-24'),
                    student_num: 2411,
                    name: '손정우',
                    start_period: 7,
                    end_period: 10,
                    state: "현체"
                }
            ];
        }
        throw new Exceptions.NotFoundDataException;
    }

    static async createPreAbsence(teacher_id, student_num, term, state) {
        const teachers = require('./fakeTeacherRepository');
        if(student_num != 1111 && student_num != 2411) {
            throw new Exceptions.NotFoundDataException;
        }

        try {
            await teachers.findById(teacher_id);
        }
        catch(e) {
            throw new Exceptions.NotFoundDataException;
        }
    }

    static async deletePreAbsenceById(id) {
        if(id != 1) {
            throw new Exceptions.NotFoundDataException;
        }
    }
}



module.exports = FakePreAbsenceRepository;