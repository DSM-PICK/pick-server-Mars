const { Router } = require('express');
const route = Router();

const ServiceDate = require('../../utils/time');

const ActivityRepository  = require('../../repositories').Activity;
const Teacher = require('../../repositories').Teacher;
const ActivityService = require('../../services/activityService');
const Exceptions = require('../../errors/servicesExceptions');

const { NotFound, BadRequest } = require('../../errors');
const { InvalidDateException, BadRequestException } = require('../../errors/requestExceptions');

const service = new ActivityService(ActivityRepository, Teacher);  


const controllers = {};

controllers.getActivityByDate = async (req, res, next) => {
    let date;

    try {
        date = new ServiceDate(req.params.date);
    } catch (e) {
        throw new InvalidDateException;
    }

    try {
        const result = await service.getThisDateActivity(date);    
        res.send(result);
    } catch (e) {
        if(e instanceof Exceptions.NotFoundDataException) {
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

    const month = Number.parseInt(req.params.month);
    if (month < 0 || month > 13) {
        throw new BadRequestException("유효하지 않은 달입니다.");
    }

    try {
        const result = await service.getThisMonthActivity(month);
        res.send(result);
    }
    catch(e) {
        if(e instanceof Exceptions.NotFoundDataException) {
            next(NotFound);
        }
        else {
            next(e);
        }
    }
};


module.exports = controllers;