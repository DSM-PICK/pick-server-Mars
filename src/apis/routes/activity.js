const { Router } = require('express');
const route = Router();

const ActivityRepository  = require('../../repositories').Activity;
const Teacher = require('../../repositories').Teacher;
const ActivityService = require('../../services/activityService');
const Exceptions = require('../../errors/servicesExceptions');

const { InvalidDate, NotFoundDataInThisDate } = require('../../errors');


const service = new ActivityService(ActivityRepository, Teacher);  

route.get('/dates/:date', async (req, res, next) => {
    try {
        const result = await service.getThisDateActivity(new Date(req.params.date));    
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

route.get('/months/:month', async (req, res, next) => {
    try {
        const result = await service.getThisMonthActivity(Number.parseInt(req.params.month));
        res.send(result);
    }
    catch(e) {
        console.log(e);
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