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
            catch(e) {
                assert.fail(e.message);
            }
        });
        it('valid result, no datas', async () => {
            try {
                const result = await prior_absence_service.getPriorAbsenceByDate(new Date('2020-08-25'));
                assert.deepEqual(result, []);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
    });

});