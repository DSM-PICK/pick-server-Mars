const { Router } = require('express');
const activity = require('./activity');


const router = Router();

router.use('/activity', activity);


module.exports = router;