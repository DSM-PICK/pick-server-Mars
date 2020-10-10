const StudentService = require('../../services/studentService');

const HttpErrors = require('../../errors');
const ServiceExceptions = require('../../errors/servicesExceptions');


let service;
const controllers = {};


controllers.getAutoCompleteStudent = async (req, res, next) => {

    let results;
    try {
        results = await service.expect_by_input(req.params.incomplete);
    } catch (e) {
        next(HttpErrors.BadRequest);
        
        return;
    }

    res.send(results);
};




module.exports = (repo) => {
    service = new StudentService(repo);

    return controllers;
};