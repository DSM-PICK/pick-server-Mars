const RepoExceptions = require('../../errors/repositoriesExceptions');
const Exceptions = require('../../errors/servicesExceptions');
const { isBetweenDate, dateToString, newToday } = require('../../utils');

class PreAbsenceService {
    constructor(pre_absence_repo, attendance_repo) {
        this.pre_absence_repo = pre_absence_repo;
        this.attendance_repo = attendance_repo;
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
                name: absence.name,
                start_date: absence.start_date,
                start_period: absence.start_period,
                end_date: absence.end_date,
                end_period: absence.end_period,
                state: absence.state,
            }
        });


        return absences;
    }

    async createPreAbsence(teacher_id, student_num, term, state) {

        if(term.start_date.getTime() > term.end_date.getTime()) {
            throw new Exceptions.InvalidTermException;
        }

        if(await checkTermConflict(this.pre_absence_repo, student_num, term)) {
            throw new Exceptions.ConflictData;
        }

        try {
            await this.pre_absence_repo.createPreAbsence(teacher_id, student_num, term, state);
        }
        catch(e) {
            throw new Exceptions.NotFoundDataException;
        }

        const today = newToday();
        if(isBetweenDate(term.start_date, term.end_date, today)) {
            let start_period = 7;
            if(dateToString(term.start_date) == dateToString(today)) {
                start_period = term.start_period;
            }

            let end_period = 10;
            if(dateToString(term.end_date) == dateToString(today)) {
                end_period = term.end_period;
            }
            for(let period = parseInt(start_period); period <= parseInt(end_period); period++) {
                try {
                    await this.attendance_repo.updateAttendance(today, student_num, period, state);
                } catch (e) {
                    console.log(this.attendance_repo);
                    console.log(e);
                }
            }
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

async function checkConflict(repo, student_num, new_term) {
    let preabsences;
    try {
        preabsences= await repo.findByTerm(new_term);
    } catch (e) {
        return false;
    }
    const conflicteds = preabsences.filter((preabsence) => preabsence.student_num == student_num);
    return conflicteds.length > 0;
}

async function checkTermConflict(repo, student_num, new_term) {
    let preabsences;
    try {
        preabsences= await repo.findByTerm(new_term);
    } catch (e) {
        return false;
    }
    const conflicteds_student = preabsences.filter((preabsence) => preabsence.student_num == student_num);
    const range_by_new_term = getRangeByTerm(new_term);
    const conflicteds = conflicteds_student.filter((preabsence) => {
        const range_by_preabsence = getRangeByTerm(preabsences);
        return isConflictRange(range_by_new_term, range_by_preabsence);
    });
    return conflicteds.length > 0;
}

function convertClassInToNumber(date, period) {
    return Math.floor(date / 1000) * 1000 + period;
}

function isConflictRange(range1, range2) {
    return (range1.start <= range2.end && range1.start >= range2.start)
        || (range1.end <= range2.end && range1.end >= range2.start)
        || (range1.start >= range2.start && range1.end <= range2.start)
        || (range1.start >= range2.end && range1.end <= range2.end);
}

function newRange(start, end) {
    return {
        start: start,
        end: end
    };
}

function getRangeByTerm(term) {
    return newRange(convertClassInToNumber(term.start_date, term.start_period),
        convertClassInToNumber(term.end_date, term.end_period));
}

module.exports = PreAbsenceService;