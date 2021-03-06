const ServiceDate = require('../../utils/time');

const PreAbsenceService = require('../../services/preAbsenceService');

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
  



    res.send(results);

};

controllers.getAllPreAbsence = async (req, res, next) => {
    let results = await service.getAllPreAbsence();
  
    
    res.send(results);
};

controllers.getEmployments = async (req, res, next) => {
    let results = await service.getEmployments();

    results = results.map((result) => {
        result = result.toJSON();
        return {
            id: result.id,
            stdnum: result.stdnum,
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
    const start_period = parseInt(req.body.start_period);
    const end_period = parseInt(req.body.end_period);
    if (end_period > 10 || start_period < 1 || start_period > end_period) {
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
    let term;
    try {
        term = PeriodRange.newRange({start_date, start_period}, {end_date, end_period});
    } catch (e) {
        next(new InvalidTermException);
        return;
    }
    const state = req.body.state;
    const reason = req.body.reason;
    const memo = req.body.memo;

    try {
        await service.createPreAbsence(teacher, student, term, state, reason, memo);
    } catch (e) {
        next(e);
        return;
    }

    res.send();
};

controllers.modifyPreAbsence = async (req, res, next) => {
    const pre_absence_id = Number(req.params.id);
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
    const reason = req.body.reason;
    const memo = req.body.memo;

    try {
        await service.modifyPreAbsence(pre_absence_id, teacher, student, term, state, reason, memo);
    } catch (e) {
        next(e);
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
        next(e);
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
        next(e);
    }
};






module.exports = (pre_absence_repo, attendance_repo, teacher_repo) => {
    service = new PreAbsenceService(pre_absence_repo, attendance_repo, teacher_repo);

    return controllers;
};

