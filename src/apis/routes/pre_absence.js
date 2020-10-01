const PreAbsenceService = require('../../services/priorAbsenceService');
const { validDateString, dateToString } = require('./ultils');

const Exceptions = require('../../errors');

let service;

const controllers = {};


controllers.getPreAbsenceByDate = async (req, res, next) => {
    
    if(validDateString(req.params.date) == false) {
        throw Exceptions.BadRequest;
    }


    const date = new Date(req.params.date);
    
    let results;
    try {
        results = await service.getPriorAbsenceByDate(date);
    } catch (e) {
        next(e);
    }
    
    
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
    
};









module.exports = (repo) => {
    service = new PreAbsenceService(repo);

    return controllers;
};

