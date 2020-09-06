const { Teacher } = require('../../repositories');
const Exceptions = require('../../errors/repositoriesExceptions');

class FakeTeacherRepository {
    static async findById(id) {
        if(id == 'Kim') {
            return {
                id: 'Kim',
                pw: 1,
                name: '김정은',
                token: 1,
            };
        }
        else if(id == 'Ahn') {
            return {
                id: 'Ahn',
                pw: 2,
                name: '안소희',
                token: 2,
            };
        }
        else if(id == 'Jwa') {
            return {
                id: 'Jwa',
                pw: 3,
                name: '좌찬익',
                token: 3,
            };
        }
        throw new Exceptions.NotFoundDataException;
    }
}

module.exports = FakeTeacherRepository;