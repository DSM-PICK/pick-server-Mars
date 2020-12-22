const assert = require('assert');

const Request = require('../fakes/fakeRequest');
const Response = require('../fakes/fakeResponse');
const Repository = require('../fakes/fakePreAbsenceRepository');
const TeacherRepository = require('../fakes/fakeTeacherRepository');
const { getPreAbsenceByDate, createPreAbsence, deletePreAbsence, getEmployments, createEmployment } = require('../../apis/routes/pre_absence')(Repository, undefined, TeacherRepository);

const { newToday, dateToString } = require('../../utils');

const Exceptins = require('../../errors');

const exceptionThrower = (e) => {
    throw e;
};


describe('pre_absence api test', () => {
    describe('getPreAbsenceByDate', () => {
        describe('success', () => {
            it('find data', async () => {
                const today = dateToString(newToday());
                const req = new Request({ params: { date: today } });
                const expected_res = new Response(
                    [
                        {
                            id: 1,
                            teacher: '김정은',
                            stdnum: 2411,
                            name: '손정우',
                            start_date: today,
                            start_period: 7,
                            end_date: today,
                            end_period: 10,
                            state: '현체'
                        }
                    ]);
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
                const expected_res = new Response([]);
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

    describe('getEmployments', () => {
        describe('success', () => {
            it('get employments', async () => {
                const expected_res = new Response(
                    [
                        {
                            id: 3,
                            stdnum: 3411,
                            name: '손정우',
                            state: '취업'
                        }
                    ]);
                const req = new Request({});
                const res = new Response();
                try {
                    await getEmployments(req, res, exceptionThrower);
                    
                    assert.deepStrictEqual(expected_res, res);
                } catch (e) {
                    assert.fail(e);
                }
            });
        });
    });

    describe('createPreAbsence', () => {
        describe('success', () => {
            it('create new pre-absence', async () => {
                const req = new Request({ body: {
                    stdnum: 2411,
                    start_date: '2020-10-01',
                    start_period: 7,
                    end_date: '2020-10-02',
                    end_period: 10,
                    state: '현체'
                },
                    auth: 'Jwa'
                });
                
                try {
                    await createPreAbsence(req, new Response, exceptionThrower);
                    assert.ok(true);
                } catch (e) {
                    assert.fail(e);
                }
            });
        });

        describe('fail', () => {
            it('couldn\'t find student', async () => {
                const req = new Request({ body: {
                    stdnum: 2511,
                    start_date: '2020-10-01',
                    start_period: 7,
                    end_date: '2020-10-02',
                    end_period: 10,
                    state: '현체'
                },
                auth: 'Jwa'});

                try {
                    await createPreAbsence(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                }
                catch(e) {
                    if(e == Exceptins.NotFound) {
                        assert.ok(true);
                    }
                    else {
                        assert.fail(e);
                    }
                }
            });

            it('couldn\'t find teacher', async () => {
                const req = new Request({ body: {
                    stdnum: 2411,
                    start_date: '2020-10-01',
                    start_period: 7,
                    end_date: '2020-10-02',
                    end_period: 10,
                    state: '현체'
                },
                auth: 'Unkown'});
                
                try {
                    await createPreAbsence(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                }
                catch(e) {
                    if(e == Exceptins.NotFound) {
                        assert.ok(true);
                    }
                    else {
                        assert.fail(e);
                    }
                }
            });
        
            it('invalid start date', async () => {
                const req = new Request({ body: {
                    stdnum: 2411,
                    start_date: '2020-10-00',
                    start_period: 7,
                    end_date: '2020-10-02',
                    end_period: 10,
                    state: '현체'
                },
                    auth: 'Jwa'});
                
                try {
                    await createPreAbsence(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                }
                catch(e) {
                    if(e == Exceptins.BadRequest) {
                        assert.ok(true);
                    }
                    else {
                        assert.fail(e);
                    }
                }
            });
    
            it('invalid end date', async () => {
                const req = new Request({ body: {
                    stdnum: 2411,
                    start_date: '2020-10-01',
                    start_period: 7,
                    end_date: '2020-10-50',
                    end_period: 10,
                    state: '현체',
                },
                    auth: 'Jwa'});
                
                try {
                    await createPreAbsence(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                }
                catch(e) {
                    if(e == Exceptins.BadRequest) {
                        assert.ok(true);
                    }
                    else {
                        assert.fail(e);
                    }
                }
            });
            
            it('invalid state', async () => {
                const req = new Request({ body: {
                    stdnum: 2411,
                    start_date: '2020-10-01',
                    start_period: 7,
                    end_date: '2020-10-02',
                    end_period: 10,
                    state: '가나',
                },
                    auth: 'Jwa'});
                
                try {
                    await createPreAbsence(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                }
                catch(e) {
                    if(e == Exceptins.BadRequest) {
                        assert.ok(true);
                    }
                    else {
                        assert.fail(e);
                    }
                }
            });
        });
    });

    describe('createEmployment', () => {
        describe('success', () => {
            it('createEmployment', async () => {
                const req = new Request({ body: {
                    stdnum: 3415,
                },
                    auth: 'Jwa'
                });
                
                try {
                    await createEmployment(req, new Response, exceptionThrower);
                    assert.ok(true);
                } catch (e) {
                    assert.fail(e);
                }
            });
        });
    });

    describe('deletePreAbsence', () => {
        describe('success', () => {
            it('do well', async () => {
                const req = new Request({ params: {id: 1} });

                try {
                    await deletePreAbsence(req, new Response, exceptionThrower);
                    assert.ok(true);
                } catch (e) {
                    assert.fail(e.message);
                }
            });
        });
        describe('fail', () => {
            it('couldn\'t find the pre-absence', async () => {
                const req = new Request({ params: {id: -1} });

                try {
                    await deletePreAbsence(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                } catch (e) {
                    if(e == Exceptins.NotFound) {
                        assert.ok(true);
                    }
                    else {
                        assert.fail(e);
                    }
                }
            });

            it('invalid id', async () => {
                const req = new Request({ params: {id: undefined} });

                try {
                    await deletePreAbsence(req, new Response, exceptionThrower);
                    assert.fail('it shouldn\'t have do well');
                } catch (e) {
                    if(e == Exceptins.BadRequest) {
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


