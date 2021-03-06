const Exceptions = require('../../errors/servicesExceptions');

const ActivityService = require('../activityService');

const { DateRange } = require('../../utils/range');

class WorkingTeacherService {
    constructor(activity_repository, teacher_repository) {
        this.activity_repository = activity_repository;
        this.teacher_repository = teacher_repository;
        this.activity_service = new ActivityService(activity_repository, teacher_repository);
    }
    
    async getWorkingTeacherByDateAndFloor(date, floor) {
        let activity_by_date;
        try {
            activity_by_date = await this.activity_repository.findBetweenTermWithTeacher(DateRange.newRange(date, date));
            activity_by_date = activity_by_date[0];
        }
        catch(e) {
            throw e;
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
        const monday_sunday_week = DateRange.newRangeWeek(month, week);
        week = DateRange.newRange(monday_sunday_week.start, monday_sunday_week.end.addDays(-2));

        let activities;
        try {
            activities = await this.activity_repository.findBetweenTermWithTeacher(week);    
        } catch (e) {
            throw e;  
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

        const diff_time = activities[0].date - date;
        const remaining_date = (diff_time / 86400000);
        return remaining_date;
    }

    async exchangeTeacher(working_teacher_identifier1, working_teacher_identifier2) {   
        const input_floor_teacher1 = working_teacher_identifier1.floor;
        const input_floor_teacher2 = working_teacher_identifier2.floor;
        
        let activity1_repo_read;
        let activity2_repo_read;
        try{
            activity1_repo_read = await this.activity_repository.findByDate(working_teacher_identifier1.date);
            activity2_repo_read = await this.activity_repository.findByDate(working_teacher_identifier2.date);
        }
        catch(e) {
            throw e;
        }
        let activity1 = activity1_repo_read;
        let activity2 = activity2_repo_read;
        

        
        const stored_teacher1_id = getTeacherByFloorInActivity(activity1, input_floor_teacher1);
        const stored_teacher2_id = getTeacherByFloorInActivity(activity2, input_floor_teacher2);

        if(stored_teacher1_id == stored_teacher2_id) {
            throw new Exceptions.ConflictData;
        }



        if(activity1.date.isSame(activity2.date)) {
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
    async changeTeacher(date, floor, teacher_id) {
        let activity = await this.activity_repository.findByDate(date);

        if(floor == 2) {
            activity.second_floor_teacher_id = teacher_id;
        }
        else if(floor == 3) {
            activity.third_floor_teacher_id = teacher_id;
        }
        else {
            activity.forth_floor_teacher_id = teacher_id;
        }

        await this.activity_repository.updateAutoDetect(activity);
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

    return teacher_id;
}

async function getTeacherNameById(repository, teacher_id) {
    return (await repository.findById(teacher_id)).name;
}


module.exports = WorkingTeacherService;
