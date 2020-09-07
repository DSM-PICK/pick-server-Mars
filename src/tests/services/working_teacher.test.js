const assert = require('assert');

const WorkingTeacherService = require('../../services/workingTeacherService');
const Exceptions = require('../../errors/servicesExceptions');
const AcvitiyRepository = require('../fakes/fakeActivityRepository');
const TeacherRepository = require('../fakes/fakeTeacherRepository');

describe('Working Teacher Service Test', () => {
    const working_teacher_service = new WorkingTeacherService(AcvitiyRepository, TeacherRepository);
    
    describe('Get Working Teacher by date and floor', () => {
        describe('valid result', () => {
            const correct_f2_result = {
                "date": "2020-08-24",
                "working_teacher": "김정은",
                "floor": 2
            };
            const correct_f3_result = {
                "date": "2020-08-24",
                "working_teacher": "안소희",
                "floor": 3
            };
            const correct_f4_result = {
                "date": "2020-08-24",
                "working_teacher": "좌찬익",
                "floor": 4
            };

            it('floor 2', async () => {
                try {
                    const result = await working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-24'), 2);
                    assert.deepEqual(result, correct_f2_result);
                }
                catch(e) {
                    assert.fail(e.message);
                }
            });
            it('floor 3', async () => {
                try {
                    const result = await working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-24'), 3);
                    assert.deepEqual(result, correct_f3_result);
                }
                catch(e) {
                    assert.fail(e.message);
                }
            });
            it('floor 4', async () => {
                try {
                    const result = await working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-24'), 4);
                    assert.deepEqual(result, correct_f4_result);
                }
                catch(e) {
                    assert.fail(e.message);
                }
            });
        });

        describe('invalid result', () => {
            it('Couldn\'t found data in the date', async () => {
                await assert.rejects(working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-25'),2),
                            Exceptions.NotFoundDataException);
            });

            it('floor is too small', async () => {
                await assert.rejects(working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-24'),1),
                            Exceptions.InvalidFloorException);
            });

            it('floor is too big', async () => {
                await assert.rejects(working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-24'),5),
                            Exceptions.InvalidFloorException);
            });
        });
        
    });

});