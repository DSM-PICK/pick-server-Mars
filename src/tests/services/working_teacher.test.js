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

    describe('Exchange working teacher\'s date', () => {
        const exist_input1 = {
            date: new Date('2020-08-24'),
            floor: 2,
            teacher_name: '김정은'
        };
        const exist_input2 = {
            date: new Date('2020-09-12'),
            floor: 3,
            teacher_name: '이진혁'
        };

        const correct_result_date1 = {
            date: '2020-08-24',
            schedule: 'club',
            second_floor_teacher_id: 'Lee',
            third_floor_teacher_id: 'Ahn',
            forth_floor_teacher_id: 'Jwa'
        };
        const correct_result_date2 = {
            date: '2020-09-12',
            schedule: 'club',
            second_floor_teacher_id: 'Son',
            third_floor_teacher_id: 'Kim',
            forth_floor_teacher_id: 'Yoo'
        };

        const ivalid_date_input = {
            date: new Date('2020-01-22'),
            floor: 3,
            teacher_name: '김정은'
        };
        const ivalid_floor_input = {
            date: new Date('2020-08-24'),
            floor: 5,
            teacher_name: '김정은'
        };
        const mismatch_teacher_input = {
            date: new Date('2020-08-24'),
            floor: 5,
            teacher_name: '김정은'
        };

        it('success exchange', async () => {
            try {
                const updated_activities = await working_teacher_service.exchangeTeacher(exist_input1, exist_input2);

                assert.deepEqual(updated_activities[0], correct_result_date1);
                assert.deepEqual(updated_activities[1], correct_result_date2);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });

        describe('invalid result', () => {
            it('not found activity', async () => {
                await assert.rejects(working_teacher_service.exchangeTeacher(ivalid_date_input, ivalid_date_input),
                            Exceptions.NotFoundDataException);
            });

            it('given invalid floor', async () => {
                await assert.rejects(working_teacher_service.exchangeTeacher(ivalid_floor_input, ivalid_floor_input),
                            Exceptions.InvalidFloorException);
            });

            it('mismatch teacher\'s name', async () => {
                await assert.rejects(working_teacher_service(mismatch_teacher_input, mismatch_teacher_input,
                            Exceptions.MismatchToRelationDatas));
            });
        });


    });
});