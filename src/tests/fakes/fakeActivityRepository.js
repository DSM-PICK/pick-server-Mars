const Exceptions = require('../../errors/repositoriesExceptions');
const { findById } = require('./fakeTeacherRepository');
const FakeTeacherRepo = require('./fakeTeacherRepository');

const { isBetweenInTerm } = require('../../utils');

let datas = makeTestActivities();


class FakeActivityRepository {
    static init() {
        datas = makeTestActivities();
    }
    static async findByDate(date) {

        const results = datas.filter((data) => {
            return new Date(data.date).getTime() == date.getTime();
        });
        if(results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        return JSON.parse(JSON.stringify(results[0]));
    }

    static async findByYearAndMonth(year, month) {
        const results = datas.filter((data) => {
            const activity_date = new Date(data.date);
            const activity_date_year = activity_date.getUTCFullYear();
            const activity_date_month = activity_date.getUTCMonth() + 1;

            return activity_date_year == year && activity_date_month == month;
        });
        if(results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        return JSON.parse(JSON.stringify(results));
    }

    static async updateAutoDetect(activity) {
        return activity;
    }

    static async findBetweenTermWithTeacher(term) {

        let activities = datas.filter((data) => {
            return isBetweenInTerm(term, new Date(data.date));
        });
        if(activities.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }

        const results = await Promise.all(activities.map(async (activity) => {
            activity.floor2 = await FakeTeacherRepo.findById(activity.second_floor_teacher_id);
            activity.floor3 = await FakeTeacherRepo.findById(activity.third_floor_teacher_id);
            activity.floor4 = await FakeTeacherRepo.findById(activity.forth_floor_teacher_id);
            return activity;
        }));

        return results;
    }

    static async findByTeacherAfterTheDateChronologicalOrder(teacher_id, date) {
        let results = datas.filter((data) => {
            const teacher_id_f2 = data.second_floor_teacher_id;
            const teacher_id_f3 = data.third_floor_teacher_id;
            const teacher_id_f4 = data.forth_floor_teacher_id;
            const activity_date = new Date(data.date);
            if (teacher_id_f2 == teacher_id || teacher_id_f3 == teacher_id || teacher_id_f4 == teacher_id) {
                return activity_date.getTime() >= date.getTime();
            }
            return false;
        });

        if(results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }

        results = results.map((activity) => {
            let result = {};
            result.teacher_id = teacher_id;
            result.date = new Date(activity.date);
            result.schedule = activity.schedule;

            return result;
        });

        return results;
    }
}

function makeTestActivities() {
    return [
        {
            date: "2019-12-24",
            schedule: "club",
            second_floor_teacher_id: 'Kim',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Ahn'
        },
        {
            date: '2020-08-24',
            schedule: 'club',
            second_floor_teacher_id: 'Kim',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Jwa'
        },
        {
            date: '2020-09-12',
            schedule: 'club',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Lee',
            forth_floor_teacher_id: 'Yoo'
        },
        {
            date: '2020-10-12',
            schedule: 'club',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Lee',
            forth_floor_teacher_id: 'Yoo'
        },
        {
            date: '2020-10-14',
            schedule: 's',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Yoo'
        },
        {
            date: '2020-10-16',
            schedule: 'b',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Lee',
            forth_floor_teacher_id: 'Jwa'
        },
        {
            date: "2021-01-24",
            schedule: "club",
            second_floor_teacher_id: 'Kim',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Ahn'
        }
    ];
}

module.exports = FakeActivityRepository;