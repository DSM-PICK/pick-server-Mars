const RepoExceptions = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');

class PreAbsenceService {
    constructor(pre_absence_repo) {
        this.pre_absence_repo = pre_absence_repo;
    }

    
    async getPreAbsenceByDate(date) {
        let absences;
        
        try {
            absences = await this.pre_absence_repo.findPreAbsenceByDate(date);
        }
        catch(e) {
            absences = [];

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

    async createPreAbsence(teacher_id, student_num, term) {

        if(term.start_date.getTime() > term.end_date.getTime()) {
            throw new Exceptions.InvalidTermException;
        }

        try {
            await this.pre_absence_repo.createPreAbsence(teacher_id, student_num, term);
        }
        catch(e) {
            throw new Exceptions.NotFoundDataException;
        }
    }


    async deletePreAbsenceById(id) {
        try {
            await this.pre_absence_repo.deletePreAbsenceById(id);
        } catch (e) {
            throw new Exceptions.NotFoundDataException;
        }
    }
}



module.exports = PreAbsenceService;