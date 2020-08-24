const { Router } = require('express');
const route = Router();

const ActivityRepository  = require('../../repositories').Activity;
const Teacher = require('../../repositories').Teacher;
const { ActivityService, Exceptions } = require('../../services/activityService');

const { InvalidDate, NotFoundDataInThisDate } = require('../../errors');

route.get('/dates/:date', async (req, res, next) => {
    const service = new ActivityService(ActivityRepository, Teacher);  

    try {
        const result = await service.getThisDateActivity(req.params.date);    
        res.send(result);
    } catch (e) {
        if(e instanceof Exceptions.InvalidDateException) {
            next(InvalidDate);
        }
        else if(e instanceof Exceptions.NotFoundDataException) {
            next(NotFoundDataInThisDate);
        }
        else {
            next(e);
        }
    }

});

module.exports = route;