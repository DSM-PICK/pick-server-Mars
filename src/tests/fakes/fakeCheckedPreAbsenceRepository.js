const Exceptions = require('../../errors/repositoriesExceptions');

let datas;

class FakeCheckedPreAbsenceRepository{

    static init() {
        datas = makeTestAttendance();
    }

    async static findOneById(id) {
        const data = datas.filter((data) => data.id == id)[0];

        if(!data) {
            throw new Exceptions.NotFoundDataException;
        }

        return data;
    }
}


function makeTestAttendance() {
    datas = [
        {
            id: 1,
            teacher_id: 'Jwa'
        }
    ];
    return datas;
}


module.exports = FakeCheckedPreAbsenceRepository;