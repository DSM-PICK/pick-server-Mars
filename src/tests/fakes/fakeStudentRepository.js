


class FakeStudentRepository {
    constructor() {
        this.students = [{
            num: 1111,
            name: '손정우',
            club_name: '모딥',
            class_name: '1-1',
        },
        {
            num: 2411,
            name: '손정우',
            club_name: 'UP',
            class_name: '2-4',
        },
        {
            num: 2401,
            name: '김대웅',
            club_name: 'DMS',
            class_name: '2-4',
        },
        {
            num: 2417,
            name: '이진혁',
            club_name: 'UP',
            class_name: '2-4',
        }];
    }

    async findAllByNum(num) {
        const finded_students = this.students.map( (student) => {
            if(String(student.num).indexOf(num) != -1) {
                return {
                    num: student.num,
                    name: student.name
                };
            }
        });

        return finded_students;
    }

    async findAllByName(name) {
        const finded_students = this.students.map( (student) => {
            if(student.name.indexOf(name) != -1) {
                return {
                    num: student.num,
                    name: student.name
                };
            }
        });

        return finded_students;
    }
}


module.exports = FakeStudentRepository;
