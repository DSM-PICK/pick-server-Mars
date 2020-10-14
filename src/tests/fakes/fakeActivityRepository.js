const Exceptions = require('../../errors/repositoriesExceptions');
const { findById } = require('./fakeTeacherRepository');
const FakeTeacherRepo = require('./fakeTeacherRepository');

const { isBetweenInTerm } = require('../../utils');

const entities = [
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



class FakeActivityRepository {
    static async findByDate(date) {

        const results = entities.filter((activity) => {
            return new Date(activity.date).getTime() == date.getTime();
        });
        if(results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        return JSON.parse(JSON.stringify(results[0]));
    }

    static async findByYearAndMonth(year, month) {
        const results = entities.filter((activity) => {
            const activity_date = new Date(activity.date);
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

        let activities = entities.filter((entity) => {
            return isBetweenInTerm(term, new Date(entity.date));
        });
        console.log(activities.length);
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
}

module.exports = FakeActivityRepository;