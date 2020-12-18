const { Router } = require('express');
const route = Router();

const ServiceDate = require('../../utils/time');

const ActivityRepository  = require('../../repositories').Activity;
const Teacher = require('../../repositories').Teacher;
const ActivityService = require('../../services/activityService');
const Exceptions = require('../../errors/servicesExceptions');

const { NotFound, BadRequest } = require('../../errors');


const service = new ActivityService(ActivityRepository, Teacher);  


const controllers = {};

controllers.getActivityByDate = async (req, res, next) => {
    try {
        const result = await service.getThisDateActivity(new ServiceDate(req.params.date));    
        res.send(result);
    } catch (e) {
        if(e instanceof Exceptions.InvalidDateException) {
            next(BadRequest);
        }
        else if(e instanceof Exceptions.NotFoundDataException) {
            res.json({
                date: req.params.date,
                schedule: "non-schedule",
                floor2: null,
                floor3: null,
                floor4: null
            });
            //next(NotFound);
        }
        else {
            next(e);
        }
    }

};


controllers.getActivityByMonth = async (req, res, next) => {
    try {
        const result = await service.getThisMonthActivity(Number.parseInt(req.params.month));
        res.send(result);
    }
    catch(e) {
        console.log(e);
        if(e instanceof Exceptions.InvalidDateException) {
            next(BadRequest);
        }
        else if(e instanceof Exceptions.NotFoundDataException) {
            next(NotFound);
        }
        else {
            next(e);
        }
    }
};


module.exports = controllers;