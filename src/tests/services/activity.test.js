const assert = require('assert');

const ActivityService = require('../../services/activityService');
const AcvitiyRepository = require('../fakes/fakeActivityRepository');


describe('Activity Service Test', () => {
    const activity_service = new ActivityService(new AcvitiyRepository);

    describe('Get Activity per Date', () => {
        const correct_result = {
            date: "2020-08-13",
            schedule: "club",
            floor2: "김정은",
            floor3: "좌차익",
            floor4: "안소희"
        };
        
        it('Given valid date', () => {
            try{
                const result = await activity_service.getThisDateActivity('2020-08-24');
                assert.deepEqual(result, correct_result);
            } catch(e) {
                assert.fail(e.message);
            }
        });

        it('Given invalid date', () => {
            try{
                const result = await activity_service.getThisDateActivity('2020-08-24');
                assert.fail('this function didn\'t throw exception');
            } catch(e) {
                assert.deepEqual(e, ActivityService.InvalidDateException);
            }
        });

        it('Not found data in given date', () => {
            try{
                const result = await activity_service.getThisDateActivity('2020-08-24');
                assert.fail('this function didn\'t throw exception');
            } catch(e) {
                assert.deepEqual(e, ActivityService.NotFoundDateException);
            }
        });

    });

});
