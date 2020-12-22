const Exceptions = require('../../errors/repositoriesExceptions');
const utils = require('../../utils');
const ServiceDate = require('../../utils/time');
const { DateRange } = require('../../utils/range');

let datas = makeTestPreAbsences();

class FakePreAbsenceRepository {
    static init() {
        datas = makeTestPreAbsences();
    }

    static async findByTerm() {
        return [];
    }
    static async findById(id) {
        return datas.filter((data) => data.id == id);
    }
    static async findPreAbsenceByDate(date) {
        const results = datas.filter((data) => {
            const range = DateRange.newRange(data.start_date, data.end_date);
            return range.isInclude(date);
        });
        if (results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        
        return results;
    }

    static async createPreAbsence(teacher_id, student_num, term, state) {
        const teachers = require('./fakeTeacherRepository');
        if(student_num != 1111 && student_num != 2411 && student_num != 3415) {
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
        const origin_lenth = datas.length;
        datas = datas.filter((data) => data.id != id);
        if(datas.length == origin_lenth) {
            throw new Exceptions.NotFoundDataException;
        }
    }
}

function makeTestPreAbsences() {
    return [
        {
            id: 1,
            teacher_id: 'Kim',
            start_date: new ServiceDate(),
            end_date: new ServiceDate(),
            student_num: 2411,
            name: '손정우',
            start_period: 7,
            end_period: 10,
            state: "현체",
            memo: "샘플 메모",
        },
        {
            id: 2,
            teacher_id: 'Kim',
            start_date: new ServiceDate('2020-09-24'),
            end_date: new ServiceDate('2020-09-24'),
            student_num: 1111,
            name: '손정우',
            start_period: 7,
            end_period: 10,
            state: "현체",
            memo: "샘플 메모",
        },
        {
            id: 3,
            teacher_id: 'Kim',
            start_date: new ServiceDate(),
            end_date: ServiceDate.newDateEndOfSchoolYear(),
            student_num: 3411,
            name: '손정우',
            start_period: 7,
            end_period: 10,
            state: "취업",
            memo: "샘플 메모",
        },
    ];

}

module.exports = FakePreAbsenceRepository;