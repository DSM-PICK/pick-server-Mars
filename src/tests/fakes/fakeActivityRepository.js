const Exceptions = require('../../errors/repositoriesExceptions');



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
        return results[0];
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
        return results;
    }

    static async updateAutoDetect(activity) {
        return activity;
    }
}

module.exports = FakeActivityRepository;