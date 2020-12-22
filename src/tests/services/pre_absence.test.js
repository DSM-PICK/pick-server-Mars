const assert = require('assert');
const { newToday, newDateNDayAwayFromToday, getFirstDateOfNextYear } = require('../../utils');
const ServiceDate = require('../../utils/time');

const PreAbsenceService = require('../../services/preAbsenceService');
const Exceptions = require('../../errors/servicesExceptions');
const PreAbsenceRepository = require('../fakes/fakePreAbsenceRepository');
const AttendanceRepostiory = require('../fakes/fakeAttendanceRepository');
const TeacherRepostiory = require('../fakes/fakeTeacherRepository');


describe('pre absence test', () => {
    const pre_absence_service = new PreAbsenceService(PreAbsenceRepository, AttendanceRepostiory, TeacherRepostiory);
    
    beforeEach(() => {
        PreAbsenceRepository.init();
        AttendanceRepostiory.init();
    });

    describe('get pre absence by date test', () => {
        const correct_result = [
            {
                id: 1,
                teacher: "김정은",
                stdnum: 2411,
                name: '손정우',
                start_date: new ServiceDate(),
                start_period: 7,
                end_date: new ServiceDate(),
                end_period: 10,
                state: "현체",
                memo: '샘플 메모'
            }
        ];
        it('valid result', async () => {
            try {
                const result = await pre_absence_service.getPreAbsenceByDate(new ServiceDate());
                assert.deepStrictEqual(result, correct_result);
            }
            catch (e) {
                assert.fail(e.message);
            }
        });
        it('valid result, no datas', async () => {
            try {
                const result = await pre_absence_service.getPreAbsenceByDate(new ServiceDate().addDays(5));
                assert.deepEqual(result, []);
            }
            catch (e) {
                assert.fail(e.message);
            }
        });
    });

    describe('get employments', () => {
        describe('success', () => {
            const correct_result = [
                {
                    id: 3,
                    teacher_id: 'Kim',
                    start_date: new ServiceDate(),
                    end_date: ServiceDate.newDateEndOfSchoolYear(),
                    student_num: 3411,
                    name: '손정우',
                    start_period: 7,
                    end_period: 10,
                    state: "취업",
                    memo: '샘플 메모'
                },
            ]
            it('get employments', async () => {
                try {
                    const result = await pre_absence_service.getEmployments();
                    assert.deepStrictEqual(result, correct_result);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });
        });
    });

    describe('create new pre absence test', () => {
        const teacher = 'Kim';
        const student = 2411;
        const term = {
            start_date: new ServiceDate('2020-08-24'),
            start_period: 7,
            end_date: new ServiceDate('2020-08-25'),
            end_period: 10
        };
        const term_today = {
            start_date: new ServiceDate(),
            start_period: 7,
            end_date: new ServiceDate(),
            end_period: 10
        }
        const term_contained_today = {
            start_date: new ServiceDate().addDays(-1),
            start_period: 7,
            end_date: new ServiceDate().addDays(1),
            end_period: 10
        }
        const state = '현체';

        describe('success', () => {
            it('success to create absence test', async () => {
                try {
                    await pre_absence_service.createPreAbsence(teacher, student, term, state);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });

            it('term is today', async () => {
                try {
                    await pre_absence_service.createPreAbsence(teacher, student, term_today, state);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });

            it('term is contained today', async () => {
                try {
                    await pre_absence_service.createPreAbsence(teacher, student, term_contained_today, state);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });

        });


        const invalid_teacher = 'Abc';
        const invalid_student = 4213;
        const invalid_term = {
            start_date: new ServiceDate('2020-08-25'),
            start_period: 7,
            end_date: new ServiceDate('2020-08-24'),
            end_period: 10
        };
        describe('fail', () => {
            it('not found teacher', async () => {
                await assert.rejects(pre_absence_service.createPreAbsence(invalid_teacher, student, term, state),
                    Exceptions.NotFoundDataException);
            });

            it('not found student', async () => {
                await assert.rejects(pre_absence_service.createPreAbsence(teacher, invalid_student, term, state),
                    Exceptions.NotFoundDataException);
            });

            it('invalid term', async () => {
                await assert.rejects(pre_absence_service.createPreAbsence(teacher, invalid_student, invalid_term, state),
                    Exceptions.InvalidTermException);
            });
        });

    });

    describe('create new employment', () => {
        describe('success', () => {
            const teacher = 'Jwa';
            const student = '3415';
            it('create new employment', async () => {
                try {
                    await pre_absence_service.createEmployment(teacher, student);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });
        });
    });

    describe('delete pre-absence', () => {
        describe('success', () => {
            it('the pre-absence contained today', async () => {
                try {
                    await pre_absence_service.deletePreAbsenceById(1)
                    assert.ok(true);
                } catch (e) {
                    assert.fail(e.message);
                }
            });

            it('the pre-absence not contained today', async () => {
                try {
                    await pre_absence_service.deletePreAbsenceById(2)
                    assert.ok(true);
                } catch (e) {
                    assert.fail(e.message);
                }
            });
        });



        describe('fail', () => {
            it('couldn\'t found tht pre-absence that have the id', async () => {
                await assert.rejects(pre_absence_service.deletePreAbsenceById(-1), Exceptions.NotFoundDataException);
            });
        });
    });
});