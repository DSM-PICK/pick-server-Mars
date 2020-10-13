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
                "floor": 2,
                "office": '2층 교무실'
            };
            const correct_f3_result = {
                "date": "2020-08-24",
                "working_teacher": "안소희",
                "floor": 3,
                "office": '3층 교무실'
            };
            const correct_f4_result = {
                "date": "2020-08-24",
                "working_teacher": "좌찬익",
                "floor": 4,
                "office": '4층 교무실'
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
        const exist_input3 = {
            date: new Date('2020-09-12'),
            floor: 4,
            teacher_name: '유시온'
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
            floor: 3,
            teacher_name: '김정은'
        };

        it('success exchange (2f - 3f)', async () => {
            try {
                const result = await working_teacher_service.exchangeTeacher(exist_input1, exist_input2);

                assert.deepEqual(result, true);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
        it('success exchange (3f - 4f)', async () => {
            try {
                const result = await working_teacher_service.exchangeTeacher(exist_input2, exist_input3);

                assert.deepEqual(result, true);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
        it('success exchange (4f - 2f)', async () => {
            try {
                const result = await working_teacher_service.exchangeTeacher(exist_input3, exist_input1);

                assert.deepEqual(result, true);
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
                await assert.rejects(working_teacher_service.exchangeTeacher(mismatch_teacher_input, mismatch_teacher_input,
                            Exceptions.MismatchToRelationDatas));
            });
        });


    });
});