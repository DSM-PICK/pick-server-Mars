const Exceptions = require('../../errors/repositoriesExceptions');
const utils = require('../../utils');

const datas = makeTestPreAbsences();

class FakePreAbsenceRepository {
    static async findByTerm() {
        return [];
    }
    static async findById(id) {
        return datas.filter((data) => data.id == id);
    }
    static async findPreAbsenceByDate(date) {
        const results = datas.filter((data) => utils.isBetweenDate(data.start_date, data.end_date, date));
        if (results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        return results;
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

function makeTestPreAbsences() {
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
        },
        {
            id: 2,
            teacher_id: 'Kim',
            start_date: new Date('2020-09-24'),
            end_date: new Date('2020-09-24'),
            student_num: 1111,
            name: '손정우',
            start_period: 7,
            end_period: 10,
            state: "현체"
        }
    ];

}

module.exports = FakePreAbsenceRepository;