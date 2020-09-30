const RepoExceptions = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');

class PriorAbsenceService {
    constructor(prior_absence_repo) {
        this.prior_absence_repo = prior_absence_repo;
    }

    
    async getPriorAbsenceByDate(date) {
        let absences;
        
        try {
            absences = await this.prior_absence_repo.findPriorAbsenceByDate(date);
        }
        catch(e) {
            if(e instanceof RepoExceptions.NotFoundDataException) {
                absences = [];
            }
            else {
                throw e;
            }
        }


        absences = absences.map((absence) => {
            return {
                id: absence.id,
                stdnum: absence.student_num,
                start_date: absence.start_date,
                start_period: absence.start_period,
                end_date: absence.end_date,
                end_period: absence.end_period,
            }
        });


        return absences;
    }

    async createPriorAbsence(teacher_id, student_num, term) {

        if(term.start_date.getTime() > term.end_date.getTime()) {
            throw new Exceptions.InvalidTermException;
        }

        try {
            await this.prior_absence_repo.createPriorAbsence(teacher_id, student_num, term);
        }
        catch(e) {
            if (e instanceof RepoExceptions.NotFoundDataException) {
                throw new Exceptions.NotFoundDataException;
            }
            throw e;
        }
    }


}



module.exports = PriorAbsenceService;