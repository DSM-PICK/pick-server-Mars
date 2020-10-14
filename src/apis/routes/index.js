const { Router } = require('express');
const activity = require('./activity');
const working_teacher =  require('./workingTeacher');
const pre_absence = require('./pre_absence')(require('../../repositories').PreAbsence, require('../../repositories').Attendance);
const student = require('./student')(require('../../repositories').Student);

const router = Router();
const router_passed_middleware = Router();


router.get('/activity/months/:month', activity.getActivityByMonth);
router.get('/activity/dates/:date', activity.getActivityByDate);

router.get('/working-teacher/today/:floor', working_teacher.getTodayWorkingTeacher);
router.get('/working-teacher/months/:month/weeks/:week', working_teacher.getWorkingTeacherInTheWeek);
router_passed_middleware.patch('/working-teacher', working_teacher.exchangeTeacher);

router_passed_middleware.get('/pre-absence/date/:date', pre_absence.getPreAbsenceByDate);
router_passed_middleware.post('/pre-absence', pre_absence.createPreAbsence);
router_passed_middleware.delete('/pre-absence/:id', pre_absence.deletePreAbsence);

router_passed_middleware.get('/student/autocomplete/:incomplete', student.getAutoCompleteStudent);



module.exports = {
    router,
    router_passed_middleware
};