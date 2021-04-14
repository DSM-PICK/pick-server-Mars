const ClubLocationRepository = require('../../repositories').ClubLocation;
const ClassService = require('../../services/classService');

let service;

const { BadRequestException } = require('../../errors/requestExceptions');

const controllers = {};

controllers.getAutoCompleteClass = async (req, res, next) => {
    const incomplete = req.query['name-like'];

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
    service = new ClassService(repo);

    return controllers;
};