const assert = require('assert');

const Request = require('../fakes/fakeRequest');
const Response = require('../fakes/fakeResponse');
const Repository = require('../fakes/fakePriorAbsenceRepository');
const { getPreAbsenceByDate, createPreAbsence } = require('../../apis/routes/pre_absence')(Repository);

const Exceptins = require('../../errors');

const exceptionThrower = (e) => {
    throw e;
};


describe('pre_absence api test', () => {
    describe('getPreAbsenceByDate', () => {
        describe('success', () => {
            it('find data', async () => {

                const req = new Request({ params: { date: '2020-08-24' } });
                const expected_res = new Response({
                    result:
                        [
                            {
                                id: 1,
                                student_num: 2411,
                                start_date: '2020-08-24',
                                start_period: 7,
                                end_date: '2020-08-24',
                                end_period: 10,
                            }
                        ]
                });
                const res = new Response();
                try {
                    await getPreAbsenceByDate(req, res, exceptionThrower);
                    assert.deepStrictEqual(expected_res, res);
                } catch (e) {
                    assert.fail(e);
                }
            });

            it('not found', async () => {
                const req = new Request({ params: { date: '2020-08-26' } });
                const expected_res = new Response({ result: [] });
                const res = new Response();
                try {
                    await getPreAbsenceByDate(req, res, exceptionThrower);
                    assert.deepStrictEqual(expected_res, res);
                } catch (e) {
                    assert.fail(e);
                }
            });
        });
        describe('fail', () => {
            it('bad request', async () => {
                const req = new Request({ params: { date: '2020-8-25' } });

                try {
                    await getPreAbsenceByDate(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                } catch (e) {
                    if (e == Exceptins.BadRequest) {
                        assert.ok(true);
                    }
                    else {
                        assert.fail(e);
                    }
                }
            });
        });
    });
});


