const RepoError = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');

class ActivityService {

    constructor(activity_repository, teacher_repository) {
        this.activity_repository = activity_repository;
        this.teacher_repository = teacher_repository;
    }

    async getThisDateActivity(date) {
        let activity;
        try{
            activity = await this.activity_repository.findByDate(date);
        }
        catch(e) {
            if(e instanceof RepoError.NotFoundDataException) {
                throw new Exceptions.NotFoundDataException;
            }
        }

        let floor2_teacher = await this.teacher_repository.findById(activity.second_floor_teacher_id);
        let floor3_teacher = await this.teacher_repository.findById(activity.third_floor_teacher_id);
        let floor4_teacher = await this.teacher_repository.findById(activity.forth_floor_teacher_id);

        const result = {
            date: activity.date,
            schedule: activity.schedule,
            floor3: floor3_teacher.name,
            floor2: floor2_teacher.name,
            floor4: floor4_teacher.name
        }
        
        return result;
    }

    async getThisMonthActivity(month) {
        if(month < 0) {
            throw new Exceptions.InvalidDateException;
        }
        if(month > 13) {
            throw new Exceptions.InvalidDateException;
        }

        const this_year = new Date().getFullYear();
        const year_to_search = month == 0 ? this_year - 1
                             : month == 13 ? this_year + 1
                             : this_year;
        const month_to_search = month == 0 ? 12
                              : month == 13 ? 1
                              : month;

        let activities;
        try {
            activities = await this.activity_repository.findByYearAndMonth(year_to_search, month_to_search);   
        } catch (e) {
            if(e instanceof RepoError.NotFoundDataException){
                throw new Exceptions.NotFoundDataException;
            }
        }

        activities = activities.map(async (activity) => {
            const floor2_teacher = await this.teacher_repository.findById(activity.second_floor_teacher_id);
            const floor3_teacher = await this.teacher_repository.findById(activity.third_floor_teacher_id);
            const floor4_teacher = await this.teacher_repository.findById(activity.forth_floor_teacher_id);



            return {
                date: activity.date,
                schedule: activity.schedule,
                floor3: floor3_teacher.name,
                floor2: floor2_teacher.name,
                floor4: floor4_teacher.name
            }
        });
        activities = await Promise.all(activities);

        const url = 'https://dsm-pick/activity/months/';
        const prev_month_url = month > 0? url + (month - 1) : null;
        const next_month_url = month < 13? url + (month + 1) : null;
        
        const result = {
            month: month,
            prev_month: prev_month_url,
            next_month: next_month_url,
            data: activities
        }

        return result;
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


module.exports = ActivityService;