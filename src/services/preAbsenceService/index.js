const Exceptions = require('../../errors/servicesExceptions');
const { DateRange, PeriodRange } = require('../../utils/range');
const ServiceDate = require('../../utils/time');

class PreAbsenceService {
    constructor(pre_absence_repo, attendance_repo, teacher_repo) {
        this.pre_absence_repo = pre_absence_repo;
        this.attendance_repo = attendance_repo;
        this.teacher_repo = teacher_repo;
    }

    async getAllPreAbsence() {
        let absences;
        
        try {
            absences = await this.pre_absence_repo.findAllPreAbsence();
        }
        catch(e) {
            absences = [];

        }
        absences = absences.filter((absences) => absences.state != '취업');

        absences = absences.map(async (absence) => {
            return {
                id: absence.id,
                teacher: await getTeacherNameById(this.teacher_repo, absence.teacher_id),
                stdnum: absence.student_num,
                name: absence.name,
                start_date: absence.start_date,
                start_period: absence.start_period,
                end_date: absence.end_date,
                end_period: absence.end_period,
                state: absence.state,
                reason: absence.reason,
            }
        });

        absences = await Promise.all(absences);
        return absences;
    }

    async getPreAbsenceByDate(date) {
        let absences;
        
        try {
            absences = await this.pre_absence_repo.findPreAbsenceByDate(date);
        }
        catch(e) {
            absences = [];

        }
        absences = absences.filter((absences) => absences.state != '취업');

        absences = absences.map(async (absence) => {
            return {
                id: absence.id,
                teacher: await getTeacherNameById(this.teacher_repo, absence.teacher_id),
                stdnum: absence.student_num,
                name: absence.name,
                start_date: absence.start_date,
                start_period: absence.start_period,
                end_date: absence.end_date,
                end_period: absence.end_period,
                state: absence.state,
                reason: absence.reason,
            }
        });

        absences = await Promise.all(absences);
        return absences;
    }

    async getEmployments() {
        let absences;
        
        try {
            absences = await this.pre_absence_repo.findPreAbsenceByDate(new ServiceDate());
        }
        catch(e) {
            absences = [];
        }
        
        absences = absences.filter((absences) => absences.state == '취업');

        return absences;
    }

    async createPreAbsence(teacher_id, student_num, term, state, reason) {
        if(await checkTermConflict(this.pre_absence_repo, student_num, term)) {
            throw new Exceptions.ConflictData;
        }

        try {
            await this.pre_absence_repo.createPreAbsence(teacher_id, student_num, term, state, reason);
        }
        catch(e) {
            throw e;
        }
        const today = new ServiceDate();
        const date_range = DateRange.newRange(term.start_date, term.end_date);
        if(date_range.isInclude(today)) {
            let { start_period, end_period } = getPeriodRangeToTerm(term);
            reflectToAttendance(this.attendance_repo, today, student_num, start_period, end_period, state);
        }
    }

    async modifyPreAbsence(pre_absence_id, teacher_id, student_num, term, state, reason) {
        if(await checkTermConflictWithoutItself(this.pre_absence_repo, pre_absence_id, student_num, term)) {
            throw new Exceptions.ConflictData;
        }

        try {
            await this.pre_absence_repo.modifyPreAbsence(pre_absence_id, teacher_id, student_num, term, state, reason);
        }
        catch(e) {
            throw e;
        }
        const today = new ServiceDate();
        const date_range = DateRange.newRange(term.start_date, term.end_date);
        if(date_range.isInclude(today)) {
            let { start_period, end_period } = getPeriodRangeToTerm(term);
            reflectToAttendance(this.attendance_repo, today, student_num, start_period, end_period, state);
        }
    }


    async createEmployment(teacher_id, student_num) {
        
        const term = PeriodRange.newRange({start_date: new ServiceDate(), start_period: 1}, 
            {start_period: ServiceDate.newDateEndOfSchoolYear(), end_period: 10});

        await this.createPreAbsence(teacher_id, student_num, term, '취업');
    }

    async deletePreAbsenceById(id) {
        let pre_absence;
        try {
            pre_absence = await this.pre_absence_repo.findById(id);
            await this.pre_absence_repo.deletePreAbsenceById(id);
        } catch (e) {
            throw e;
        }

        pre_absence = pre_absence[0];
        const today = new ServiceDate();
        const term = {
            start_date: pre_absence.start_date,
            end_date: pre_absence.end_date,
            start_period: pre_absence.start_period,
            end_period: pre_absence.end_period,
        };
        const student_num = pre_absence.student_num;
        const range = DateRange.newRange(term.start_date, term.end_date);
        if(range.isInclude(today)){
            let { start_period, end_period } = getPeriodRangeToTerm(term);
            reflectToAttendance(this.attendance_repo, today, student_num, start_period, end_period, '출석');
        }


    }
}

function getPeriodRangeToTerm(term) {
    const today = new ServiceDate();
    let start_period = 7;
    if(term.start_date.isSame(today)) {
        start_period = term.start_period;
    }

    let end_period = 10;
    if(term.end_date.isSame(today)) {
        end_period = term.end_period;
    }

    return {start_period, end_period};
}

async function reflectToAttendance(repo, date, student_num, start_period, end_period, state) {
    console.log(date);
    for(let period = parseInt(start_period); period <= parseInt(end_period); period++) {
        try {
            await repo.updateAttendance(date.toJSDate(), student_num, period, state);
        } catch (e) {
            console.log(e);
        }
    }
}

async function checkTermConflict(repo, student_num, new_term) {
    let preabsences;
    try {
        preabsences= await repo.findByTerm(new_term);
    } catch (e) {
        return false;
    }
    const conflicteds_student = preabsences.filter((preabsence) => preabsence.student_num == student_num);
    const period_range = PeriodRange.newRange(new_term, new_term);
    const conflicteds = conflicteds_student.filter((preabsence) => {
        const range_by_preabsence = PeriodRange.newRange(preabsence, preabsence);
        return PeriodRange.isConflict(period_range, range_by_preabsence);
    });
    
    return conflicteds.length > 0;
}

async function checkTermConflictWithoutItself(repo, pre_absence_id, student_num, new_term) {
    let preabsences;
    try {
        preabsences= await repo.findByTerm(new_term);
    } catch (e) {
        return false;
    }
    const conflicteds_student = preabsences.filter((preabsence) => preabsence.student_num == student_num && preabsence.id != pre_absence_id);
    const period_range = PeriodRange.newRange(new_term, new_term);
    const conflicteds = conflicteds_student.filter((preabsence) => {
        const range_by_preabsence = PeriodRange.newRange(preabsence, preabsence);
        return PeriodRange.isConflict(period_range, range_by_preabsence);
    });
    
    return conflicteds.length > 0;
}

async function getTeacherNameById(repository, teacher_id) {
    return (await repository.findById(teacher_id)).name;
}


async function getTeacherNameById(repository, teacher_id) {
    return (await repository.findById(teacher_id)).name;
}

module.exports = PreAbsenceService;
