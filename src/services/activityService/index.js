class ActivityService {

    constructor(activity_repository, teacher_repository) {
        this.activity_repository = activity_repository;
        this.teacher_repository = teacher_repository;
    }

    async getThisDateActivity(str_date) {
        if(isValidDate(str_date) == false) {
            throw new InvalidDateException;
        }

        const date = new Date(str_date);
        let activity_entity = await this.activity_repository.findOne({where: {date: date}});

        if(activity_entity == null) {
            throw new NotFoundDataException;
        }


        activity_entity = activity_entity.dataValues;


        let floor2_teacher_entity = await this.teacher_repository.findOne({where: {id: activity_entity.second_floor_teacher_id}});
        let floor3_teacher_entity = await this.teacher_repository.findOne({where: {id: activity_entity.third_floor_teacher_id}});
        let floor4_teacher_entity = await this.teacher_repository.findOne({where: {id: activity_entity.forth_floor_teacher_id}});


        floor2_teacher_entity = floor2_teacher_entity.dataValues;
        floor3_teacher_entity = floor3_teacher_entity.dataValues;
        floor4_teacher_entity = floor4_teacher_entity.dataValues;
        

        const activity = {
            date: activity_entity.date,
            floor2: floor2_teacher_entity.name,
            floor3: floor3_teacher_entity.name,
            floor4: floor4_teacher_entity.name,
            schedule: activity_entity.schedule
        }
        

        return activity;
    }
}
function isValidDate(str) {
    if  ( !/([0-9]{4})-([0-9]{2})-([0-9]{2})/.test(str) )  {
        return false;
    }
    
    var splited_date = str.split('-');
    var max_day = new Date(new Date(splited_date[0], splited_date[1], 1) - 86400000).getDate();
    
    if  ( splited_date[1] < 1 || splited_date[1] > 12  )  {
        return false;
    }
    if  ( splited_date[2] > max_day )  {
        return false;
    }
    return true;
}

class InvalidDateException extends Error {
    constructor() {
        super('Given date is not valid');
    }
}

class NotFoundDataException extends Error{
    constructor() {
        super('Couldn\'t found data in given date');
    }
}
module.exports = {
    ActivityService,
    Exceptions: {
        InvalidDateException,
        NotFoundDataException
    }
};