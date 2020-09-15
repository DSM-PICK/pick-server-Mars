const assert = require('assert');

const PriorAbsenceService = require('../../services/priorAbsenceService');
const Exceptions = require('../../errors/servicesExceptions');
const PriorAbsenceRepository = require('../fakes/fakePriorAbsenceRepository');

describe('prior absence test', () => {
    const prior_absence_service = new PriorAbsenceService(PriorAbsenceRepository);
    describe('get prior absence by date test', () => {
        const correct_result = [
            {
                stdnum: 2411,
                start_date: new Date("2020-08-24"),
                start_period: 7,
                end_date: new Date("2020-08-24"),
                end_period: 10
            }
        ];
        it('valid result', async () => {
            try {
                const result = await prior_absence_service.getPriorAbsenceByDate(new Date('2020-08-24'));
                assert.deepEqual(result, correct_result);
            }
            catch (e) {
                assert.fail(e.message);
            }
        });
        it('valid result, no datas', async () => {
            try {
                const result = await prior_absence_service.getPriorAbsenceByDate(new Date('2020-08-25'));
                assert.deepEqual(result, []);
            }
            catch (e) {
                assert.fail(e.message);
            }
        });
    });

    describe('create new prior absence test', () => {
        const teacher = 'Kim';
        const student = 1111;
        const term = {
            start_date: new Date('2020-08-24'),
            start_period: 7,
            end_date: new Date('2020-08-25'),
            end_period: 10
        };

        describe('success', () => {
            it('success to create absence test', async () => {
                try {
                    await prior_absence_service.createPriorAbsence(teacher, student, term);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });
        });


        const invalid_teacher = 'Abc';
        const invalid_student = 4213;
        const term = {
            start_date: new Date('2020-08-25'),
            start_period: 7,
            end_date: new Date('2020-08-24'),
            end_period: 10
        };
        describe('fail', () => {
            it('not found teacher', async () => {
                assert.rejects(prior_absence_service.createPriorAbsence(invalid_teacher, student, term),
                    Exceptions.NotFoundDataException);
            });

            it('not found student', async () => {
                assert.rejects(prior_absence_service.createPriorAbsence(teacher, invalid_student, term),
                    Exceptions.NotFoundDataException);
            });

            it('invalid term', async () => {
                assert.rejects(prior_absence_service.createPriorAbsence(teacher, invalid_student, term),
                    Exceptions.InvalidTermException);
            });
        });

    });

});