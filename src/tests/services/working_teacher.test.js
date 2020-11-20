const assert = require('assert');

const WorkingTeacherService = require('../../services/workingTeacherService');
const Exceptions = require('../../errors/servicesExceptions');
const AcvitiyRepository = require('../fakes/fakeActivityRepository');
const TeacherRepository = require('../fakes/fakeTeacherRepository');

const { newToday } = require('../../utils');

const theDate = new Date(newToday().getUTCFullYear() + '-08-11');
const theDate1 = new Date(newToday().getUTCFullYear() + '-08-12');
const theDate2 = new Date(newToday().getUTCFullYear() + '-08-13');

describe('Working Teacher Service Test', () => {
    const working_teacher_service = new WorkingTeacherService(AcvitiyRepository, TeacherRepository);

    beforeEach(() => {
        AcvitiyRepository.init();
        TeacherRepository.init();
    });

    describe('Get Working Teacher by date and floor', () => {
        describe('valid result', () => {
            const correct_f2_result = {
                "date": theDate,
                "working_teacher": "김정은",
                "floor": 2,
                "office": '2층 교무실'
            };
            const correct_f3_result = {
                "date": theDate,
                "working_teacher": "안소희",
                "floor": 3,
                "office": '3층 교무실'
            };
            const correct_f4_result = {
                "date": theDate,
                "working_teacher": "좌찬익",
                "floor": 4,
                "office": '4층 교무실'
            };

            it('floor 2', async () => {
                try {
                    const result = await working_teacher_service.getWorkingTeacherByDateAndFloor(theDate, 2);
                    assert.deepEqual(result, correct_f2_result);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });
            it('floor 3', async () => {
                try {
                    const result = await working_teacher_service.getWorkingTeacherByDateAndFloor(theDate, 3);
                    assert.deepEqual(result, correct_f3_result);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });
            it('floor 4', async () => {
                try {
                    const result = await working_teacher_service.getWorkingTeacherByDateAndFloor(theDate, 4);
                    assert.deepEqual(result, correct_f4_result);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });
        });

        describe('invalid result', () => {
            it('Couldn\'t found data in the date', async () => {
                await assert.rejects(working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-25'), 2),
                    Exceptions.NotFoundDataException);
            });

            it('floor is too small', async () => {
                await assert.rejects(working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-24'), 1),
                    Exceptions.InvalidFloorException);
            });

            it('floor is too big', async () => {
                await assert.rejects(working_teacher_service.getWorkingTeacherByDateAndFloor(new Date('2020-08-24'), 5),
                    Exceptions.InvalidFloorException);
            });
        });

    });

    describe('Exchange working teacher\'s date', () => {
        const exist_input1 = {
            date: theDate,
            floor: 2,
            teacher_name: '김정은'
        };
        const exist_input2 = {
            date: theDate1,
            floor: 3,
            teacher_name: '이진혁'
        };
        const exist_input3 = {
            date: theDate2,
            floor: 4,
            teacher_name: '유시온'
        };

        const ivalid_date_input = {
            date: new Date('2020-02-22'),
            floor: 3,
            teacher_name: '김정은'
        };
        const ivalid_floor_input = {
            date: theDate,
            floor: 5,
            teacher_name: '김정은'
        };
        const mismatch_teacher_input = {
            date: theDate,
            floor: 3,
            teacher_name: '김정은'
        };

        it('success exchange (2f - 3f)', async () => {
            try {
                const result = await working_teacher_service.exchangeTeacher(exist_input1, exist_input2);

                assert.deepEqual(result, true);
            }
            catch (e) {
                assert.fail(e.message);
            }
        });
        it('success exchange (3f - 4f)', async () => {
            try {
                const result = await working_teacher_service.exchangeTeacher(exist_input2, exist_input3);

                assert.deepEqual(result, true);
            }
            catch (e) {
                assert.fail(e.message);
            }
        });
        it('success exchange (4f - 2f)', async () => {
            try {
                const result = await working_teacher_service.exchangeTeacher(exist_input3, exist_input1);

                assert.deepEqual(result, true);
            }
            catch (e) {
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

        });


    });

    describe('Get Working Teacher by Week', () => {

        const week = 3;
        const month = 10;
        const one_date_second = 86400000;
        const today = new Date(newToday().getUTCFullYear() +'-10-5');
        const first_day_in_month = new Date(new Date(today.setUTCDate(1)).setUTCMonth(month - 1));
    
        const sunday_the_week = first_day_in_month.getTime() + ((week - 1) * 7 * one_date_second) - first_day_in_month.getUTCDay() * one_date_second;
        const saturday_the_week = sunday_the_week + one_date_second * 6;
    
        const monday = new Date(sunday_the_week + one_date_second);
        const firday = new Date(saturday_the_week - one_date_second);

        const correct = [
            {
                date: monday,
                floor2: '손정우',
                floor3: '이진혁',
                floor4: '유시온',
                floor2_office: '본부 교무실',
                floor3_office: '교장실',
                floor4_office: '탁구장'
            },
            {
                date: firday,
                floor2: '손정우',
                floor3: '안소희',
                floor4: '유시온',
                floor2_office: '본부 교무실',
                floor3_office: '3층 교무실',
                floor4_office: '탁구장'
            },
        ];
        describe('succes', () => {
            it('success', async () => {
                try {
                    const result = await working_teacher_service.getWorkingTeacherByWeek(10, 3);
                    assert.deepStrictEqual(result, correct);
                }
                catch (e) {
                    assert.fail(e.message);
                }
            });
        });

        describe('fail', () => {
            it('not found date exception', async () => {
                await assert.rejects(working_teacher_service.getWorkingTeacherByWeek(10, 1),
                    Exceptions.NotFoundDataException);

            });
        });
    });

    describe('Get Remaining Date for User to Work as Working Teacehr', () => {
        describe('success', () => {
            it('today', async () => {
                const teacher_id = 'Son';
                const date = new Date('2020-11-12');
                assert.deepStrictEqual(
                    await working_teacher_service.getRemainingDateForTheTeacehrFromTheDate(teacher_id, date),
                    0
                );
            });
            it('tomorrow', async () => {
                const teacher_id = 'Son';
                const date = new Date('2020-11-11');
                assert.deepStrictEqual(
                    await working_teacher_service.getRemainingDateForTheTeacehrFromTheDate(teacher_id, date),
                    1
                );
            });
        });
    });

});
