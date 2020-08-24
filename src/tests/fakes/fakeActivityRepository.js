const { Activity } = require('../../repositories');

class FakeActivityRepository extends Activity {
    static async findOne(option) {
        if(option.where.date.getTime() == new Date('2020-08-24').getTime()) {
            return {
                dataValues: {
                  date: '2020-08-24',
                  schedule: 'club',
                  second_floor_teacher_id: 'Kim',
                  third_floor_teacher_id: 'Ahn',
                  forth_floor_teacher_id: 'Jwa'
                }
              };
        }
        return null;
    }
}

module.exports = FakeActivityRepository;