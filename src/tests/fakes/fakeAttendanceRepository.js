const StudentRepo = require('./fakeStudentRepository');

let datas;

StudentRepo.init();
class FakeAttendanceRepository{

    init() {
        datas = makeTestAttendance();
    }

    static async updateAttendance(date, student, period, state) {
        try {
            await StudentRepo.findAllByNum(student);
        } catch (e) {
            throw e;
        }
        target_attendance = datas.filter((attendance) => attendance.student_num == student 
                                    && new Date(attendance.date) == date
                                    && attendance.period == period)[0];

        target_attendance.state = state;
    }

}


function makeTestAttendance() {
    return [];
}


module.exports = FakeAttendanceRepository;