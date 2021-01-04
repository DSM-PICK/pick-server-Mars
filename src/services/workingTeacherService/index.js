const RepoError = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');

const ActivityService = require('../activityService');
const { newTerm, newToday } = require('../../utils');

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
            // activity_by_date = await this.activity_service.getThisDateActivity(date);
            activity_by_date = await this.activity_repository.findBetweenTermWithTeacher(newTerm(date, date));
            // console.log(activity_by_date);
            activity_by_date = activity_by_date[0];
        }
        catch(e) {
            throw new Exceptions.NotFoundDataException;
        }

        const working_teacher = floor == 2? activity_by_date.floor2
                               :floor == 3? activity_by_date.floor3
                               :activity_by_date.floor4;


        const result = {
            date: activity_by_date.date,
            working_teacher: working_teacher.name,
            floor: floor,
            office: working_teacher.office
        };

        return result;
    }

    async getWorkingTeacherByWeek(month, week) {
        const one_date_second = 86400000;
        const today = newToday();
        const first_day_in_month = new Date(new Date(today.setUTCDate(1)).setUTCMonth(month - 1));
        
        const sunday_the_week = first_day_in_month.getTime() + ((week - 1) * 7 * one_date_second) - first_day_in_month.getUTCDay() * one_date_second;
        const saturday_the_week = sunday_the_week + one_date_second * 6;

        const monday = new Date(sunday_the_week + one_date_second);
        const firday = new Date(saturday_the_week - one_date_second);

        let activities;
        try {
            activities = await this.activity_repository.findBetweenTermWithTeacher(newTerm(monday, firday));    
        } catch (e) {
            throw new Exceptions.NotFoundDataException;    
        }
        
        
        const results = activities.map((activity) => {
            const result = {
                date: activity.date,
                floor2: activity.floor2.name,
                floor3: activity.floor3.name,
                floor4: activity.floor4.name,
                floor2_office: activity.floor2.office,
                floor3_office: activity.floor3.office,
                floor4_office: activity.floor4.office
            };

            return result;
        });


        return results;
    }

    async getRemainingDateForTheTeacehrFromTheDate(teacher_id, date) {
        let activities;
        try {
            activities = await this.activity_repository.findByTeacherAfterTheDateChronologicalOrder(teacher_id, date);
        } catch (e) {
            return -1;
        }

        const diff_time = activities[0].date.getTime() - date.getTime();
        const remaining_date = (diff_time / 86400000);
        return remaining_date;
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
            throw new Exceptions.NotFoundDataException;
        }
        let activity1 = activity1_repo_read;
        let activity2 = activity2_repo_read;
        

        
        const stored_teacher1_id = getTeacherByFloorInActivity(activity1, input_floor_teacher1);
        const stored_teacher2_id = getTeacherByFloorInActivity(activity2, input_floor_teacher2);

        if(stored_teacher1_id == stored_teacher2_id) {
            throw new Exceptions.ConflictData;
        }



        if(activity1.date == activity2.date) {
            activity1 = activity2;
        }
        
        if(input_floor_teacher1 == 2) {
            activity1.second_floor_teacher_id = stored_teacher2_id;
        }
        else if(input_floor_teacher1 == 3) {
            activity1.third_floor_teacher_id = stored_teacher2_id;
        }
        else {
            activity1.forth_floor_teacher_id = stored_teacher2_id;
        }

        if(input_floor_teacher2 == 2) {
            activity2.second_floor_teacher_id = stored_teacher1_id;
        }
        else if(input_floor_teacher2 == 3) {
            activity2.third_floor_teacher_id = stored_teacher1_id;
        }
        else {
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
    else {
        teacher_id = activity.forth_floor_teacher_id;
    }

    //const teacher_name = repository.findById(teacher_id);
    return teacher_id;
}

async function getTeacherNameById(repository, teacher_id) {
    return (await repository.findById(teacher_id)).name;
}


module.exports = WorkingTeacherService;
