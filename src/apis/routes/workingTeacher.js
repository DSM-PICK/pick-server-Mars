const ActivityRepository = require('../../repositories').Activity;
const TeacherRepository = require('../../repositories').Teacher;
const WorkingTeacherService = require('../../services/workingTeacherService');

const service = new WorkingTeacherService(ActivityRepository, TeacherRepository);
const ServiceDate = require('../../utils/time');

const { InvalidFloorException, InvalidDateException } = require('../../errors/requestExceptions');

const controllers = {};

controllers.getTodayWorkingTeacher = async (req, res, next) => {
    const today = new ServiceDate();

    const floor = req.params.floor;

    if(floor != 2 && floor != 3 && floor != 4) {
        next(new InvalidFloorException);
        return;
    }

    try {
        const result = await service.getWorkingTeacherByDateAndFloor(today, req.params.floor);
        res.send(result);
    }
    catch (e) {
        next(e);
    }
};

controllers.exchangeTeacher = async (req, res, next) => {
    let teacher1;
    let teacher2;
    try {
        teacher1 = {
            floor: req.body.floor1,
            date: new ServiceDate(req.body.date1),
            teacher_name: req.body.teacher_name1
        };
        teacher2 = {
            floor: req.body.floor2,
            date: new ServiceDate(req.body.date2),
            teacher_name: req.body.teacher_name2
        };
    } catch(e) {
        next(new InvalidDateException);
        return;
    }

    if(isValidFloor(teacher1.floor) == false || isValidFloor(teacher2.floor) == false) {
        next(new InvalidFloorException);
        return;
    }


    try {
        await service.exchangeTeacher(teacher1, teacher2);
        res.send();
    }
    catch(e) {
        next(e);
    }
};

controllers.changeTeacher = async (req, res, next) => {
    const { floor, teacher_id} = req.body;
    
    let date;
    try {
        date = new ServiceDate(req.body.date);
    } catch (e) {
        next(new InvalidDateException);
        return;
    }
    
    if(isValidFloor(floor) == false) {
        next(new InvalidFloorException);
        return;
    }

    try {
        await service.changeTeacher(date, floor, teacher_id);
        res.send();
    } catch (e) {
        next(e);
    }

};

controllers.getWorkingTeacherInTheWeek = async (req, res, next) => {
    try {
        const result = await service.getWorkingTeacherByWeek(req.params.month, req.params.week);
        res.send(result);
    }
    catch (e) {
        next(e);
    }
};

controllers.GetRemainingDateForUser = async (req, res, next) => {
    const teacher_id = req.auth;
    let remaining_date;
    try {
        remaining_date = await service.getRemainingDateForTheTeacehrFromTheDate(teacher_id, new ServiceDate());
    } catch (e) {
        next(e);
        return;
    }
    res.send({remaining_date});
};

function isValidFloor(floor) {
    return floor == 2 || floor == 3 || floor == 4;
}
module.exports = controllers;