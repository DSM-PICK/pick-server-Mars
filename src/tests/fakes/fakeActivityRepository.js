const Exceptions = require('../../errors/repositoriesExceptions');
const { findById } = require('./fakeTeacherRepository');
const FakeTeacherRepo = require('./fakeTeacherRepository');

const { isBetweenInTerm, newToday, newDateNDayAwayFromToday, getFirstDateOfNextYear, getLastDateOfLastYear } = require('../../utils');

let datas = makeTestActivities();


class FakeActivityRepository {
    static init() {
        datas = makeTestActivities();
    }
    static async findByDate(date) {

        const results = datas.filter((data) => {
            return data.date.getTime() == date.getTime();
        });
        if(results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        return results[0];
        //return JSON.parse(JSON.stringify(results[0]));
    }

    static async findByYearAndMonth(year, month) {
        const results = datas.filter((data) => {
            const activity_date = data.date;
            const activity_date_year = activity_date.getUTCFullYear();
            const activity_date_month = activity_date.getUTCMonth() + 1;

            return activity_date_year == year && activity_date_month == month;
        });
        if(results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        return results;
        //return JSON.parse(JSON.stringify(results));
    }

    static async updateAutoDetect(activity) {
        return activity;
    }

    static async findBetweenTermWithTeacher(term) {

        let activities = datas.filter((data) => {
            return isBetweenInTerm(term, data.date);
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
            result.date = activity.date;
            result.schedule = activity.schedule;

            return result;
        });

        return results;
    }
}

function makeTestActivities() {
    let datas = [
        {
            date: getLastDateOfLastYear(),
            schedule: "club",
            second_floor_teacher_id: 'Kim',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Ahn'
        },
        {
            date: new Date(newToday().getUTCFullYear() + '-08-11'), // the date
            schedule: 'club',
            second_floor_teacher_id: 'Kim',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Jwa'
        },
        {
            date: new Date(newToday().getUTCFullYear() + '-08-12'),
            schedule: 'club',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Yoo',
            forth_floor_teacher_id: 'Lee'
        },
        {
            date: new Date(newToday().getUTCFullYear() + '-08-13'),
            schedule: 'club',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Yoo',
            forth_floor_teacher_id: 'Lee'
        },
        {
            date: new Date(newToday().getUTCFullYear() + '-11-12'),
            schedule: 'club',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Yoo',
            forth_floor_teacher_id: 'Lee'
        },
        {
            date: getFirstDateOfNextYear(),
            schedule: "club",
            second_floor_teacher_id: 'Kim',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Ahn'
        }
    ];


    for(const data of makeThirdWeekInOctober()) {
        datas.push(data);
    }

    return datas;
}

function makeThirdWeekInOctober() {
    const week = 3;
    const month = 10;
    const one_date_second = 86400000;
    const today = new Date(newToday().getUTCFullYear() +'-10-5');
    const first_day_in_month = new Date(new Date(today.setUTCDate(1)).setUTCMonth(month - 1));

    const sunday_the_week = first_day_in_month.getTime() + ((week - 1) * 7 * one_date_second) - first_day_in_month.getUTCDay() * one_date_second;
    const saturday_the_week = sunday_the_week + one_date_second * 6;

    const monday = new Date(sunday_the_week + one_date_second);
    const firday = new Date(saturday_the_week - one_date_second);

    return [
        {
            date: monday,
            schedule: "club",
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Lee',
            forth_floor_teacher_id: 'Yoo'
        },
        {
            date: firday,
            schedule: "club",
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Yoo'
        },
    ];

}



module.exports = FakeActivityRepository;