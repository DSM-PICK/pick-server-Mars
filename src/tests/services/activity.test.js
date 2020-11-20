const assert = require('assert');

const ActivityService = require('../../services/activityService');
const Exceptions = require('../../errors/servicesExceptions');
const AcvitiyRepository = require('../fakes/fakeActivityRepository');
const TeacherRepository = require('../fakes/fakeTeacherRepository');
const { newDateNDayAwayFromToday, newToday, getLastDateOfLastYear, getFirstDateOfNextYear } = require('../../utils');


describe('Activity Service Test', () => {
    const activity_service = new ActivityService(AcvitiyRepository, TeacherRepository);
    
    beforeEach(() => {
        TeacherRepository.init();
    });

    describe('Get Activity per Date', () => {
        const correct_result = {
            date: new Date(newToday().getUTCFullYear() + '-08-11'),
            schedule: "club",
            floor2: "김정은",
            floor3: "안소희",
            floor4: "좌찬익"
        };
        
        it('Given valid date', async () => {
            try{
                const result = await activity_service.getThisDateActivity(new Date(newToday().getUTCFullYear() + '-08-11'));
                assert.deepEqual(result, correct_result);
            } catch(e) {
                assert.fail(e.message);
            }
        });

        it('Not found data in given date', async () => {
            await assert.rejects(activity_service.getThisDateActivity(new Date('2000-08-24')), 
                            Exceptions.NotFoundDataException);
        });

    });

    describe('Get Activity per Month', () => {
        const correct_result_last_year = {
            month: 0,
            data: [
                {
                    date: getLastDateOfLastYear(),
                    schedule: "club",
                    floor2: "김정은",
                    floor3: "안소희",
                    floor4: "안소희"
                },
            ]
        };
        const correct_result_this_year = {
            month: 8,
            data: [
                {
                    date: new Date(newToday().getUTCFullYear() + '-08-11'),
                    schedule: "club",
                    floor2: "김정은",
                    floor3: "안소희",
                    floor4: "좌찬익"
                },
                {
                    date: new Date(newToday().getUTCFullYear() + '-08-12'),
                    schedule: "club",
                    floor2: "손정우",
                    floor3: "유시온",
                    floor4: "이진혁"
                },
                {
                    date: new Date(newToday().getUTCFullYear() + '-08-13'),
                    schedule: "club",
                    floor2: "손정우",
                    floor3: "유시온",
                    floor4: "이진혁"
                },
            ]
        };
        const correct_result_next_year = {
            month: 13,
            data: [
                {
                    date: getFirstDateOfNextYear(),
                    schedule: "club",
                    floor2: "김정은",
                    floor3: "안소희",
                    floor4: "안소희"
                },
            ]
        };
        it('Given valid Month (December last year)', async () => {
            try {
                const result = await activity_service.getThisMonthActivity(0);
                assert.deepEqual(result, correct_result_last_year);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
        it('Given valid Month (This year)', async () => {
            try {
                const result = await activity_service.getThisMonthActivity(8);
                assert.deepEqual(result, correct_result_this_year);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
        it('Given valid Month (Next January)', async () => {
            try {
                const result = await activity_service.getThisMonthActivity(13);
                assert.deepEqual(result, correct_result_next_year);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
        
        describe('Given invalid date', () => {
            it('Not specified month, under 0', async () => {
                await assert.rejects(activity_service.getThisMonthActivity(-1),
                                Exceptions.InvalidDateException);
            });
            it('Not specified month, over 13', async () => {
                await assert.rejects(activity_service.getThisMonthActivity(14),
                                Exceptions.InvalidDateException);
            });
            it('can\'t find activity', async () => {
                //2월달은 방학으로 activity 데이터가 없을 것으로 예상됨
                await assert.rejects(activity_service.getThisMonthActivity(2),
                                Exceptions.NotFoundDataException);
            });
        });

    });

});
