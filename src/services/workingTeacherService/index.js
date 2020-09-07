const RepoError = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');

const ActivityService = require('../activityService');

class WorkingTeacherService {
    constructor(activity_repository, teacher_repository) {
        this.activity_repository = activity_repository;
        this.teacher_repository = teacher_repository;
        this.activity_service = new ActivityService(this.activity_repository, this.teacher_repository);
    }
    
    async getWorkingTeacherByDateAndFloor(date, floor) {
        let activity_by_date;
        try {
            activity_by_date = await this.activity_service.getThisDateActivity(date);
        }
        catch(e) {
            if(e instanceof Exceptions.NotFoundDataException){
                throw e;
            }
        }

        if(floor < 2) {
            throw new Exceptions.InvalidFloorException;
        }
        if(floor > 4) {
            throw new Exceptions.InvalidFloorException;
        }

        const working_teacher = floor == 2? activity_by_date.floor2
                               :floor == 3? activity_by_date.floor3
                               :activity_by_date.floor4;


        const result = {
            date: activity_by_date.date,
            working_teacher: working_teacher,
            floor: floor
        };

        return result;
    }

}


module.exports = WorkingTeacherService;
