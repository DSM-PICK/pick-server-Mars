const StudentRepo = require('./fakeStudentRepository');
const Exceptions = require('../../errors/repositoriesExceptions');
const { newToday } = require('../../utils');

let datas;

StudentRepo.init();
class FakeAttendanceRepository{

    static init() {
        datas = makeTestAttendance();
    }

    static async updateAttendance(date, student, period, state) {
        try {
            await StudentRepo.findAllByNum(student);
        } catch (e) {
            throw e;
        }
        const target_attendance = datas.filter((attendance) => {
            return attendance.student_num == student 
                                    && attendance.date.getTime() == date.getTime()
                                    && attendance.period == period})[0];
        
        if(!target_attendance) {
            throw new Exceptions.NotFoundDataException;
        }

        target_attendance.state = state;
    }

}


function makeTestAttendance() {
    datas = [
        { 
            id: 1,
            date: newToday(),
            student_num: 2411,
            period: 8,
            teacher_id: 'Ahn',
            state: '출석',
        },
        { 
            id: 2,
            date: newToday(),
            student_num: 2411,
            period: 9,
            teacher_id: 'Ahn',
            state: '출석',
        },
        { 
            id: 3,
            date: newToday(),
            student_num: 2411,
            period: 10,
            teacher_id: 'Ahn',
            state: '출석',
        },
    ];
    return datas;
}


module.exports = FakeAttendanceRepository;