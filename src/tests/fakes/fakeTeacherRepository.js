const { Teacher } = require('../../repositories');

class FakeTeacherRepository extends Teacher {
    static async findOne(option) {
        if(option.where.id == 'Kim') {
            return {
                dataValues: {
                  id: 'Kim',
                  pw: 1,
                  name: '김정은',
                  token: 1,
                }
            };
        }
        else if(option.where.id == 'Ahn') {
            return {
                dataValues: {
                  id: 'Ahn',
                  pw: 2,
                  name: '안소희',
                  token: 2,
                }
            };
        }
        else if(option.where.id == 'Jwa') {
            return {
                dataValues: {
                  id: 'Jwa',
                  pw: 3,
                  name: '좌찬익',
                  token: 3,
                }
            };
        }
        return null;
    }
}

module.exports = FakeTeacherRepository;