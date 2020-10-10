const PreAbsenceService = require('../../services/priorAbsenceService');
const { validDateString, dateToString } = require('./ultils');

const HttpErrors = require('../../errors');
const ServiceExceptions = require('../../errors/servicesExceptions');


let service;
const controllers = {};

controllers.getPreAbsenceByDate = async (req, res, next) => {

    if (validDateString(req.params.date) == false) {
        next(HttpErrors.BadRequest);
        return;
    }


    const date = new Date(req.params.date);

    let results = await service.getPriorAbsenceByDate(date);
  


    results = results.map((result) => {
        return {
            id: result.id,
            student_num: result.stdnum,
            start_date: dateToString(result.start_date),
            start_period: result.start_period,
            end_date: dateToString(result.end_date),
            end_period: result.end_period,
        };
    });

    res.send(results);

};

controllers.createPreAbsence = async (req, res, next) => {

    if (validDateString(req.body.start_date) == false ||
        validDateString(req.body.end_date) == false) {
        next(HttpErrors.BadRequest);
        return;
    }

    const teacher = req.auth;
    const student = req.body.stdnum;
    const term = {
        start_date: new Date(req.body.start_date),
        start_period: req.body.start_period,
        end_date: new Date(req.body.end_date),
        end_period: req.body.end_period,

    };

    try {
        await service.createPriorAbsence(teacher, student, term);
    } catch (e) {
        next(HttpErrors.NotFound);
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






module.exports = (repo) => {
    service = new PreAbsenceService(repo);

    return controllers;
};

