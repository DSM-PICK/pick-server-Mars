const assert = require('assert');


const Request = require('../fakes/fakeRequest');
const Response = require('../fakes/fakeResponse');
const Repository = require('../fakes/fakeStudentRepository');
const { getAutoCompleteStudent } = require('../../apis/routes/student')(Repository);

const Exceptins = require('../../errors');

const exceptionThrower = (e) => {
    throw e;
};



describe('student api test', () => {
    describe('getAutoCompleteStudent', () => {
        describe('success', () => {
            it('do well', async () => {
                const req = new Request({ params: { incomplete: '24' } });
                const expected_res = new Response(
                    [
                        '2401 김대웅',
                        '2411 손정우',
                        '2401 이진혁',
                    ]);
                const res = new Response();
                try {
                    await getAutoCompleteStudent(req, res, exceptionThrower);
                    
                    assert.deepStrictEqual(expected_res, res);
                } catch (e) {
                    assert.fail(e);
                }
            });
        });
        
        describe('fail', () => {
            it('give invalid request', async () => {
                const req = new Request({ params: { date: '' } });

                try {
                    await getAutoCompleteStudent(req, new Response, exceptionThrower);
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

