const assert = require('assert');

const { ActivityService, Exceptions} = require('../../services/activityService');
const AcvitiyRepository = require('../fakes/fakeActivityRepository');
const TeacherRepository = require('../fakes/fakeTeacherRepository');

const { loadDatabase } = require('../../loaders/database');

(async() => {
    await loadDatabase();
})();


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
                const result = await activity_service.getThisDateActivity('2020-08-24');
                assert.deepEqual(result, correct_result);
            } catch(e) {
                assert.fail(e.message);
            }
        });
        
        describe('Given invalid date', () => {
            it('Not exist date, too big day', async () => {
                await assert.rejects(activity_service.getThisDateActivity('2020-02-30'), 
                                Exceptions.InvalidDateException);
            });

            it('Not exist date, too big month', async () => {
                await assert.rejects(activity_service.getThisDateActivity('2020-13-15'), 
                                Exceptions.InvalidDateException);
            });
            
            it('Not Specified format date', async () => {
                await assert.rejects(activity_service.getThisDateActivity('20200825'), 
                                Exceptions.InvalidDateException);
            });

        });

        it('Not found data in given date', async () => {
            await assert.rejects(activity_service.getThisDateActivity('2000-08-24'), 
                            Exceptions.NotFoundDataException);
        });

    });

});
