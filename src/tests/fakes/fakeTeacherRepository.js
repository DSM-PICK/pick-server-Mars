const Exceptions = require('../../errors/repositoriesExceptions');

let datas = makeTestTeachers();

class FakeTeacherRepository {
    static init() {
        datas = makeTestTeachers();
    }
    static async findById(id) {
        const results = datas.filter((data) => data.id == id);
        if(results.length <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
        return results[0];
    }
}


function makeTestTeachers() {
    return [{
        id: 'Kim',
        pw: 1,
        name: '김정은',
        token: 1,
        office: '2층 교무실'
    },

    {
        id: 'Ahn',
        pw: 2,
        name: '안소희',
        token: 2,
        office: '3층 교무실'
    },
    {
        id: 'Jwa',
        pw: 3,
        name: '좌찬익',
        token: 3,
        office: '4층 교무실'
    },

    {
        id: 'Son',
        pw: 4,
        name: '손정우',
        token: 4,
        office: '본부 교무실'
    },

    {
        id: 'Lee',
        pw: 5,
        name: '이진혁',
        token: 5,
        office: '교장실'
    },

    {
        id: 'Yoo',
        pw: 6,
        name: '유시온',
        token: 6,
        office: '탁구장'
    },];
}

module.exports = FakeTeacherRepository;