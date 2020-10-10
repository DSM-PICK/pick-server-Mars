const RepoError = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');

const ActivityService = require('../activityService');

class WorkingTeacherService {
    constructor(activity_repository, teacher_repository) {
        this.activity_repository = activity_repository;
        this.teacher_repository = teacher_repository;
        this.activity_service = new ActivityService(activity_repository, teacher_repository);
    }
    
    async getWorkingTeacherByDateAndFloor(date, floor) {
        let activity_by_date;
        if(floor < 2) {
            throw new Exceptions.InvalidFloorException;
        }
        if(floor > 4) {
            throw new Exceptions.InvalidFloorException;
        }
        try {
            activity_by_date = await this.activity_service.getThisDateActivity(date);
        }
        catch(e) {
            if(e instanceof Exceptions.NotFoundDataException){
                throw e;
            }
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

    async exchangeTeacher(working_teacher_identifier1, working_teacher_identifier2) {   
        const input_floor_teacher1 = working_teacher_identifier1.floor;
        const input_floor_teacher2 = working_teacher_identifier2.floor;
        
        if(input_floor_teacher1 < 2 || input_floor_teacher1 > 4 
            || input_floor_teacher2 < 2 || input_floor_teacher2 > 4) {
                throw new Exceptions.InvalidFloorException;
            }
        let activity1_repo_read;
        let activity2_repo_read;
        try{
            activity1_repo_read = await this.activity_repository.findByDate(working_teacher_identifier1.date);
            activity2_repo_read = await this.activity_repository.findByDate(working_teacher_identifier2.date);
        }
        catch(e) {
            if(e instanceof RepoError.NotFoundDataException) {
                throw new Exceptions.NotFoundDataException;
            }
            
            throw e;
        }
        const activity1 = activity1_repo_read;
        const activity2 = activity2_repo_read;
        

        const input_teacher1_name = working_teacher_identifier1.teacher_name;
        const input_teacher2_name = working_teacher_identifier2.teacher_name;
        
        const stored_teacher1_id = getTeacherByFloorInActivity(activity1, input_floor_teacher1);
        const stored_teacher2_id = getTeacherByFloorInActivity(activity2, input_floor_teacher2);

        const stored_teacher1_name = await getTeacherNameById(this.teacher_repository, stored_teacher1_id);
        const stored_teacher2_name = await getTeacherNameById(this.teacher_repository, stored_teacher2_id);


        if(input_teacher1_name != stored_teacher1_name || input_teacher2_name != stored_teacher2_name) {
            throw new Exceptions.MismatchToRelationDatas;
        }

        
        if(input_floor_teacher1 == 2) {
            activity1.second_floor_teacher_id = stored_teacher2_id;
        }
        else if(input_floor_teacher1 == 3) {
            activity1.third_floor_teacher_id = stored_teacher2_id;
        }
        else if(input_floor_teacher1 == 4) {
            activity1.forth_floor_teacher_id = stored_teacher2_id;
        }

        if(input_floor_teacher2 == 2) {
            activity2.second_floor_teacher_id = stored_teacher1_id;
        }
        else if(input_floor_teacher2 == 3) {
            activity2.third_floor_teacher_id = stored_teacher1_id;
        }
        else if(input_floor_teacher2 == 4) {
            activity2.forth_floor_teacher_id = stored_teacher1_id;
        }

        await this.activity_repository.updateAutoDetect(activity1);
        await this.activity_repository.updateAutoDetect(activity2);
        
        return true;
        
    }
}


function getTeacherByFloorInActivity(activity, floor) {
    let teacher_id;
    if(floor == 2) {
        teacher_id = activity.second_floor_teacher_id;
    }
    else if(floor == 3) {
        teacher_id = activity.third_floor_teacher_id;
    }
    else if(floor == 4) {
        teacher_id = activity.forth_floor_teacher_id;
    }
    else {
        throw new Exceptions.InvalidFloorException;
    }

    //const teacher_name = repository.findById(teacher_id);
    return teacher_id;
}

async function getTeacherNameById(repository, teacher_id) {
    return (await repository.findById(teacher_id)).name;
}


module.exports = WorkingTeacherService;
