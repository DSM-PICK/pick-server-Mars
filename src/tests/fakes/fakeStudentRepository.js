const students = [{
    num: 1101,
    name: '김대웅',
    club_name: '팬텀',
    class_name: '1-1',
},
{
    num: 1111,
    name: '손정우',
    club_name: '모딥',
    class_name: '1-1',
},
{
    num: 2401,
    name: '김대웅',
    club_name: 'DMS',
    class_name: '2-4',
},
{
    num: 2411,
    name: '손정우',
    club_name: 'UP',
    class_name: '2-4',
},
{
    num: 2417,
    name: '이진혁',
    club_name: 'UP',
    class_name: '2-4',
}];


class FakeStudentRepository {
    constructor() {
        
    }

    static async findAllByNum(num) {
        const finded_students = students.filter( (student) => {
            if(String(student.num).indexOf(num) != -1) {
                return true;
            }
        });

        return finded_students;
    }

    static async findAllByName(name) {
        const finded_students = students.filter( (student) => {
            if(student.name.indexOf(name) != -1) {
                return true;
            }
        });

        return finded_students;
    }

    static async findAllByNumberAndName(num, name) {
        const finded_students = students.filter( (student) => {
            if(student.name.indexOf(name) != -1 && String(student.num).indexOf(num) != -1) {
                return true;
            }
        });
        return finded_students;
    }
}


module.exports = FakeStudentRepository;
