const assert = require('assert');

const PriorAbsenceService = require('../../services/priorAbsenceService');
const Exceptions = require('../../errors/servicesExceptions');
const PriorAbsenceRepository = require('../fakes/fakePriorAbsenceRepository');

describe('prior absence test', () => {
    describe('get prior absence by date test', () => {
        const correct_result = [
                {
                    stdnum: 2411,
                    start_date: 2020/08/13,
                    start_period: 7,
                    end_date: 2020/08/16,
                    end_period: 10
                }
            ];
        it('valid result', async () => {
            try {
                const result = await PriorAbsenceService.getPriorAbsenceByDate(new Date('2020-08-24'));
                assert.deepEqual(result, correct_result);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
    });

});