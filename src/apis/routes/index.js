const { Router } = require('express');
const activity = require('./activity');
const working_teacher =  require('./workingTeacher');
const pre_aabsence = require('./pre_absence')(require('../../repositories').PriorAbsence);
const student = require('./student')(require('../../repositories').Student);


const router = Router();


router.get('/activity/months/:month', activity.getActivityByMonth);
router.get('/activity/dates/:date', activity.getActivityByDate);

router.get('/working-teacher/today/:floor', working_teacher.getTodayWorkingTeacher);
router.patch('/working-teacher/exchange', working_teacher.exchangeTeacher);

router.get('/pre-absence/date/:date', pre_aabsence.getPreAbsenceByDate);
router.post('/pre-absence', pre_aabsence.createPreAbsence);

router.get('/student/autocomplete/:incomplete', student.getAutoCompleteStudent);



module.exports = router;