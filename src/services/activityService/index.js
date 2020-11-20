const RepoError = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');

class ActivityService {

    constructor(activity_repository, teacher_repository) {
        this.activity_repository = activity_repository;
        this.teacher_repository = teacher_repository;
    }

    async getThisDateActivity(date) {
        let activity;
        try {
            activity = await this.activity_repository.findByDate(date);
        }
        catch (e) {
            if (e instanceof RepoError.NotFoundDataException) {
                throw new Exceptions.NotFoundDataException;
            }
            throw e;
        }

        const null_name_teacher = { name: null };
        let floor2_teacher;
        try {
            floor2_teacher = await this.teacher_repository.findById(activity.second_floor_teacher_id);
        } catch (e) {
            floor2_teacher = null_name_teacher;
        }

        let floor3_teacher;
        try {
            floor3_teacher = await this.teacher_repository.findById(activity.third_floor_teacher_id);
        } catch (e) {
            floor3_teacher = null_name_teacher;
        }

        let floor4_teacher;
        try {
            floor4_teacher = await this.teacher_repository.findById(activity.forth_floor_teacher_id);
        } catch (e) {
            floor4_teacher = null_name_teacher;
        }

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
        if (month < 0) {
            throw new Exceptions.InvalidDateException;
        }
        if (month > 13) {
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
            throw new Exceptions.NotFoundDataException;
            //throw e;
        }
        const null_name_teacher = { name: null };
        activities = activities.map(async (activity) => {
            let floor2_teacher;
            try {
                floor2_teacher = await this.teacher_repository.findById(activity.second_floor_teacher_id);
            } catch (e) {
                floor2_teacher = null_name_teacher;
            }

            let floor3_teacher;
            try {
                floor3_teacher = await this.teacher_repository.findById(activity.third_floor_teacher_id);
            } catch (e) {
                floor3_teacher = null_name_teacher;
            }

            let floor4_teacher;
            try {
                floor4_teacher = await this.teacher_repository.findById(activity.forth_floor_teacher_id);
            } catch (e) {
                floor4_teacher = null_name_teacher;
            }


            return {
                date: activity.date,
                schedule: activity.schedule,
                floor3: floor3_teacher.name,
                floor2: floor2_teacher.name,
                floor4: floor4_teacher.name
            }
        });
        activities = await Promise.all(activities);

        const result = {
            month: month,
            data: activities
        }

        return result;
    }
}


module.exports = ActivityService;