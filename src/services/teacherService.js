const Exceptions = require('../errors/servicesExceptions');

class TeacherService {
    constructor(teacher_repository) {
        this.teacher_repository = teacher_repository;
    }

    async expect_by_name(name) {
        const finded_teachers = await this.teacher_repository.findAllByName(name);

        const result = finded_teachers;

        return result;
    }


}


module.exports = TeacherService;