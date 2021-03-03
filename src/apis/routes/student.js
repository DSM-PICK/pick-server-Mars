const StudentService = require('../../services/studentService');


const { BadRequestException } = require('../../errors/requestExceptions');

let service;
const controllers = {};


controllers.getAutoCompleteStudent = async (req, res, next) => {
    const incomplete = req.params.incomplete;
    const datas = incomplete.split(' ').filter((data) => {
        return data; // remove disturbed data like ''
    });
    if(datas.length > 2 || datas.length < 1) {
        next(new BadRequestException);
        return;
    }

    let number = undefined;
    let name = undefined;
    for(const data of datas) {
        if(isNaN(Number(data)) == false) {
            number = data;
        }
        else {
            name = data;
        }
    }

    let results;
    try {
        results = await service.expect_by_input(number, name);
    } catch (e) {
        next(e);
        return;
    }

    res.send(results);
};




module.exports = (repo) => {
    service = new StudentService(repo);

    return controllers;
};