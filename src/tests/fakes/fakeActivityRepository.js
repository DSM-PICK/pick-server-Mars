const Exceptions = require('../../errors/repositoriesExceptions');

class FakeActivityRepository {
    static async findByDate(date) {
        if(date.getTime() == new Date('2020-08-24').getTime()) {
            return {
                date: '2020-08-24',
                schedule: 'club',
                second_floor_teacher_id: 'Kim',
                third_floor_teacher_id: 'Ahn',
                forth_floor_teacher_id: 'Jwa'
              };
        }
        throw new Exceptions.NotFoundDataException;
    }

    static async findByYearAndMonth(year, month) {
        const result_last_year = [
            {
                date: "2019-12-24",
                schedule: "club",
                second_floor_teacher_id: 'Kim',
                third_floor_teacher_id: 'Ahn',
                forth_floor_teacher_id: 'Ahn'
            },
        ];
        const result_this_year = [
            {
                date: "2020-08-24",
                schedule: "club",
                second_floor_teacher_id: 'Kim',
                third_floor_teacher_id: 'Ahn',
                forth_floor_teacher_id: 'Ahn'
            },
        ];
        const result_next_year = [
            {
                date: "2021-01-24",
                schedule: "club",
                second_floor_teacher_id: 'Kim',
                third_floor_teacher_id: 'Ahn',
                forth_floor_teacher_id: 'Ahn'
            },
        ];
        if(year == 2019){
           return result_last_year;
        }
        if(year == 2020) {
            return result_this_year;
        }
        if(year == 2021) {
            return result_next_year;
        }

        throw new Exceptions.NotFoundDataException;
    }
}

module.exports = FakeActivityRepository;