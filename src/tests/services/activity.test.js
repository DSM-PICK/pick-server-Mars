const assert = require('assert');

const ActivityService = require('../../services/activityService');
const Exceptions = require('../../errors/servicesExceptions');
const AcvitiyRepository = require('../fakes/fakeActivityRepository');
const TeacherRepository = require('../fakes/fakeTeacherRepository');


describe('Activity Service Test', () => {
    const activity_service = new ActivityService(AcvitiyRepository, TeacherRepository);

    describe('Get Activity per Date', () => {
        const correct_result = {
            date: "2020-08-24",
            schedule: "club",
            floor2: "김정은",
            floor3: "안소희",
            floor4: "좌찬익"
        };
        
        it('Given valid date', async () => {
            try{
                const result = await activity_service.getThisDateActivity(new Date('2020-08-24'));
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
            prev_month: null,
            next_month: "https://dsm-pick/activity/months/1",
            data: [
                {
                    date: "2019-12-24",
                    schedule: "club",
                    floor2: "김정은",
                    floor3: "안소희",
                    floor4: "안소희"
                },
            ]
        };
        const correct_result_this_year = {
            month: 8,
            prev_month: "https://dsm-pick/activity/months/7",
            next_month: "https://dsm-pick/activity/months/9",
            data: [
                {
                    date: "2020-08-24",
                    schedule: "club",
                    floor2: "김정은",
                    floor3: "안소희",
                    floor4: "안소희"
                },
            ]
        };
        const correct_result_next_year = {
            month: 13,
            prev_month: "https://dsm-pick/activity/months/12",
            next_month: null,
            data: [
                {
                    date: "2021-01-24",
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
        });

    });

});
