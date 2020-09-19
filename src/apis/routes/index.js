const { Router } = require('express');
const activity = require('./activity');
const working_teacher =  require('./workingTeacher');

const router = Router();

router.use('/activity', activity);
router.use('/working-teacher', working_teacher);


module.exports = router;