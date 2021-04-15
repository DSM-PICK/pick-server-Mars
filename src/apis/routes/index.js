const { Router } = require('express');
const activity = require('./activity');
const working_teacher =  require('./workingTeacher');
const pre_absence = require('./pre_absence')(require('../../repositories').PreAbsence, require('../../repositories').Attendance, require('../../repositories').Teacher);
const student = require('./student')(require('../../repositories').Student);
const teacher = require('./teacher')(require('../../repositories').Teacher);
const class_controller = require('./class')(require('../../repositories').ClubLocation);

const router = Router();
const router_passed_middleware = Router();


router.get('/activity/months/:month', activity.getActivityByMonth);
router.get('/activity/dates/:date', activity.getActivityByDate);

router.get('/working-teacher/today/:floor', working_teacher.getTodayWorkingTeacher);
router.get('/working-teacher/months/:month/weeks/:week', working_teacher.getWorkingTeacherInTheWeek);
router_passed_middleware.patch('/working-teacher', working_teacher.exchangeTeacher);
router_passed_middleware.get('/working-teacher/user/remaining-date',working_teacher.GetRemainingDateForUser);
router_passed_middleware.put('/working-teacher', working_teacher.changeTeacher);

router_passed_middleware.get('/pre-absence', pre_absence.getAllPreAbsence);
router_passed_middleware.get('/pre-absence/date/:date', pre_absence.getPreAbsenceByDate);
router_passed_middleware.get('/pre-absence/employments', pre_absence.getEmployments);
router_passed_middleware.post('/pre-absence/employment', pre_absence.createEmployment);
router_passed_middleware.post('/pre-absence', pre_absence.createPreAbsence);
router_passed_middleware.put('/pre-absence/:id', pre_absence.modifyPreAbsence);
router_passed_middleware.delete('/pre-absence/:id', pre_absence.deletePreAbsence);

router_passed_middleware.get('/student/autocomplete/:incomplete', student.getAutoCompleteStudent);
router_passed_middleware.get('/teacher/autocomplete/:incomplete', teacher.getAutoCompleteTeacher);
router.get('/class', class_controller.getAutoCompleteClass);


module.exports = {
    router,
    router_passed_middleware
};

// .
