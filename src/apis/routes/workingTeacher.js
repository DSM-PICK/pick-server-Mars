const { Router } = require('express');
const route = Router();


const ActivityRepository = require('../../repositories').Activity;
const TeacherRepository = require('../../repositories').Teacher;
const WorkingTeacherService = require('../../services/workingTeacherService');
const Exceptions = require('../../errors/servicesExceptions');
const HttpErrors = require('../../errors');

const service = new WorkingTeacherService(ActivityRepository, TeacherRepository);


route.get('/today/:floor', async (req, res, next) => {
    const today = setUTCDateLikeGMT(new Date());

    try {
        const result = await service.getWorkingTeacherByDateAndFloor(today, req.params.floor);
        res.send(result);
    }
    catch (e) {
        if (e instanceof Exceptions.NotFoundDataException) {
            next(HttpErrors.NotFoundDataInThisFloor);
        }
        else if (e instanceof Exceptions.InvalidFloorException) {
            next(HttpErrors.InvalidFloor);
        }
        next(e);
    }
});

route.patch('/exchange', async (req, res, next) => {

    const teacher1 = {
        floor: req.body.floor1,
        date: new Date(req.body.date1),
        teacher_name: req.body.teacher_name1
    };
    const teacher2 = {
        floor: req.body.floor2,
        date: new Date(req.body.date2),
        teacher_name: req.body.teacher_name2
    };

    try {
        await service.exchangeTeacher(teacher1, teacher2);
        res.send();
    }
    catch(e) {
        console.log(e);
        if (e instanceof Exceptions.NotFoundDataException) {
            next(HttpErrors.NotFoundTeacher);
        }
        else if (e instanceof Exceptions.InvalidFloorException) {
            next(HttpErrors.InvalidFloor);
        }
        else if(e instanceof Exceptions.MismatchToRelationDatas) {
            next(HttpErrors.NotFoundTeacher);
        }
        else {
            next(e);
        }
    }
});


function setUTCDateLikeGMT(date) {
    return new Date(new Date(new Date().setUTCDate(date.getDate())).setUTCHours(0, 0, 0, 0));
}

module.exports = route;