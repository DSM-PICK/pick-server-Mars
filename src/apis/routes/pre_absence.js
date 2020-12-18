const ServiceDate = require('../../utils/time');

const PreAbsenceService = require('../../services/preAbsenceService');
const { validDateString, dateToString } = require('../../utils');

const HttpErrors = require('../../errors');
const ServiceExceptions = require('../../errors/servicesExceptions');


let service;
const controllers = {};

controllers.getPreAbsenceByDate = async (req, res, next) => {

    if (validDateString(req.params.date) == false) {
        next(HttpErrors.BadRequest);
        return;
    }


    const date = new ServiceDate(req.params.date);

    let results = await service.getPreAbsenceByDate(date);
  


    results = results.map((result) => {
        return {
            id: result.id,
            stdnum: result.stdnum,
            name: result.name,
            start_date: dateToString(result.start_date),
            start_period: result.start_period,
            end_date: dateToString(result.end_date),
            end_period: result.end_period,
            state: result.state,
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

    if (validDateString(req.body.start_date) == false ||
        validDateString(req.body.end_date) == false ||
        !req.body.start_period||
        !req.body.end_period||
        req.body.state != '현체' && req.body.state != '공결' && req.body.state != '외출' && req.body.state != '병결' && req.body.state != '이동' && req.body.state != '취업' && req.body.state != '귀가') {
        next(HttpErrors.BadRequest);
        return;
    }

    const teacher = req.auth;
    const student = req.body.stdnum;
    const term = {
        start_date: new ServiceDate(req.body.start_date),
        start_period: req.body.start_period,
        end_date: new ServiceDate(req.body.end_date),
        end_period: req.body.end_period,
    };
    const state = req.body.state;

    try {
        if (state != '이동') {
            await service.createPreAbsence(teacher, student, term, state);
        }
        else {
            await service.createPreAbsenceToMoving(teacher, student, term, req.body.memo);
        }
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
        next(HttpErrors.BadRequest);
    }

    try {
        await service.deletePreAbsenceById(id);
        res.send();
    } catch (e) {
        next(HttpErrors.NotFound);
    }
};






module.exports = (pre_absence_repo, attendance_repo) => {
    service = new PreAbsenceService(pre_absence_repo, attendance_repo);

    return controllers;
};

