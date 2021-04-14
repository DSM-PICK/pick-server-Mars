const Exceptions = require('../errors/servicesExceptions');

class ClassService {
    constructor(club_location_repository) {
        this.club_location_repository = club_location_repository;
    }

    async expect_by_name(name) {
        const finded_class = await this.club_location_repository.findAllByName(name);

        const result = finded_class;

        return result;
    }


}


module.exports = ClassService;