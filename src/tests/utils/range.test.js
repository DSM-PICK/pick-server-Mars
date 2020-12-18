const assert = require('assert');
const { DateRange } = require('../../utils/range');
const ServiceDate = require('../../utils/time');

const { InvalidRange } = require('../../errors/utils');

describe('DateRange test', () => {
    describe('create DateRange', () => {
        it('success', () => {
            try {
                DateRange.newRange(new ServiceDate('2020-12-18'), new ServiceDate('2020-12-19'));
                assert.ok(true);
            } catch (e) {
                assert.fail(e.message);
            }
        });
        it('fail', () => {
            assert.throws(() => { 
                DateRange.newRange(new ServiceDate('2020-12-19'), new ServiceDate('2020-12-18'))
            }, InvalidRange);
        });
    });

    describe('conflict check', () => {
        it('is conflict', () => {
            const range1 = DateRange.newRange(new ServiceDate('2020-12-18'), new ServiceDate('2020-12-20'));
            const range2 = DateRange.newRange(new ServiceDate('2020-12-19'), new ServiceDate('2020-12-21'));
            assert.deepStrictEqual(DateRange.isConflict(range1, range2), true);
        });

        it('isn\'t conflict', () => {
            const range1 = DateRange.newRange(new ServiceDate('2020-12-18'), new ServiceDate('2020-12-19'));
            const range2 = DateRange.newRange(new ServiceDate('2020-12-20'), new ServiceDate('2020-12-21'));
            assert.deepStrictEqual(DateRange.isConflict(range1, range2), false);
        });
    });
});

