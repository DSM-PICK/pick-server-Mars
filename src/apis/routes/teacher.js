const TeacherRepository = require('../../repositories').Teacher;
const TeacherService = require('../../services/teacherService');

let service;

const { BadRequestException } = require('../../errors/requestExceptions');

const controllers = {};

controllers.getAutoCompleteTeacher = async (req, res, next) => {
    const incomplete = req.params.incomplete;

    if(!incomplete) {
        next(new BadRequestException);
        return;
    }


    let results;
    try {
        results = await service.expect_by_name(incomplete);
    } catch (e) {
        next(e);
        return;
    }

    res.send(results);
};

module.exports = (repo) => {
    service = new TeacherService(repo);

    return controllers;
};