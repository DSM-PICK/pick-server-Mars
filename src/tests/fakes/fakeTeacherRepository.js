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
        else if(id == 'Son') {
            return {
                id: 'Son',
                pw: 4,
                name: '손정우',
                token: 4,
            };
        }
        else if(id == 'Lee') {
            return {
                id: 'Lee',
                pw: 5,
                name: '이진혁',
                token: 5,
            };
        }
        else if(id == 'Yoo') {
            return {
                id: 'Yoo',
                pw: 6,
                name: '유시온',
                token: 6,
            };
        }
        throw new Exceptions.NotFoundDataException;
    }
}

module.exports = FakeTeacherRepository;