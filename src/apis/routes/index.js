const { Router } = require('express');
const activity = require('./activity');
const working_teacher =  require('./workingTeacher');

const router = Router();


router.get('/activity/months/:month', activity.getActivityByMonth);
router.get('/activity/dates/:date', activity.getActivityByDate);

router.get('/working-teacher/today/:floor', working_teacher.getTodayWorkingTeacher);
router.patch('/working-teacher/exchange', working_teacher.exchangeTeacher);


module.exports = router;