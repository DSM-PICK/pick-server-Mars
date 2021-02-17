const ServiceDate = require('../../utils/time');

const PreAbsenceService = require('../../services/preAbsenceService');
const { validDateString, dateToString } = require('../../utils');

const HttpErrors = require('../../errors');
const ServiceExceptions = require('../../errors/servicesExceptions');

const { InvalidDateException, BadRequestException, InvalidTermException } = require('../../errors/requestExceptions');

const { PeriodRange } = require('../../utils/range');

let service;
const controllers = {};

controllers.getPreAbsenceByDate = async (req, res, next) => {
    let date;
    try {
        date = new ServiceDate(req.params.date);   
    } catch (e) {
        next(new InvalidDateException);
        return;
    }
    let results = await service.getPreAbsenceByDate(date);
  


    results = results.map((result) => {
        return {
            id: result.id,
            stdnum: result.stdnum,
            name: result.name,
            start_date: result.start_date.toString(),
            start_period: result.start_period,
            end_date: result.end_date.toString(),
            end_period: result.end_period,
            state: result.state,
            teacher: result.teacher,
            memo: result.memo,
        };
    });

    res.send(results);

};

controllers.getAllPreAbsence = async (req, res, next) => {
    let results = await service.getAllPreAbsence();
  
    results = results.map((result) => {
        return {
            id: result.id,
            stdnum: result.stdnum,
            name: result.name,
            start_date: result.start_date.toString(),
            start_period: result.start_period,
            end_date: result.end_date.toString(),
            end_period: result.end_period,
            state: result.state,
            teacher: result.teacher,
            memo: result.memo,
        };
    });
    res.send(results);
};

controllers.getEmployments = async (req, res, next) => {
    let results = await service.getEmployments();

    results = results.map((result) => {
        return {
            id: result.id,
            stdnum: result.student_num,
            name: result.name,
            state: result.state,
        };
    });

    res.send(results);
};

controllers.createPreAbsence = async (req, res, next) => {

    if (!req.body.start_period||
        !req.body.end_period||
        req.body.state != '현체' && req.body.state != '공결' && req.body.state != '외출' && req.body.state != '병결' && req.body.state != '이동' && req.body.state != '취업' && req.body.state != '귀가') {
        next(new BadRequestException);
        return;
    }

    let start_date;
    let end_date;
    try {
        start_date = new ServiceDate(req.body.start_date);
        end_date = new ServiceDate(req.body.end_date);
    } catch (e) {
        next(new InvalidDateException);
        return;
    }

    const teacher = req.auth;
    const student = req.body.stdnum;
    const start_period = req.body.start_period;
    const end_period = req.body.end_period;
    let term;
    try {
        term = PeriodRange.newRange({start_date, start_period}, {end_date, end_period});
    } catch (e) {
        next(new InvalidTermException);
        return;
    }
    const state = req.body.state;
    const memo = req.body.memo;

    try {
        await service.createPreAbsence(teacher, student, term, state, memo);
    } catch (e) {
        if(e instanceof ServiceExceptions.ConflictData) {
            next(HttpErrors.Conflict);
        }
        else {
            next(HttpErrors.NotFound);
        }
        return;
    }

    res.send();
};

controllers.createEmployment = async (req, res, next) => {
    const teacher = req.auth;
    const student = req.body.stdnum;
    
    console.log(`[create employment] student: ${student} teacher: ${teacher}`);

    try {
        await service.createEmployment(teacher, student);
    } catch (e) {
        if(e instanceof ServiceExceptions.ConflictData) {
            next(HttpErrors.Conflict);
        }
        else {
            next(HttpErrors.NotFound);
        }
        return;
    }

    res.send();
};

controllers.deletePreAbsence = async (req, res, next) => {
    const id = req.params.id * 1;

    if(Number.isInteger(id) == false) {
        next(new BadRequestException);
        return;
    }

    try {
        await service.deletePreAbsenceById(id);
        res.send();
    } catch (e) {
        next(HttpErrors.NotFound);
    }
};






module.exports = (pre_absence_repo, attendance_repo, teacher_repo) => {
    service = new PreAbsenceService(pre_absence_repo, attendance_repo, teacher_repo);

    return controllers;
};

