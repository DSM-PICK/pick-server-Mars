const assert = require('assert');
const { newDateNDayAwayFromToday, newToday } = require('../utils');
const utils = require('../utils');

describe('Utils test', () => {
    describe('isBetweenDate test', () => {
        it('is between', () => {
            assert.strictEqual(
                utils.isBetweenDate(new Date('2020-11-12'), new Date('2020-11-15'), new Date('2020-11-13')),
                true);
        });
        it('is between with reversed date', () => {
            assert.strictEqual(
                utils.isBetweenDate(new Date('2020-11-15'), new Date('2020-11-12'), new Date('2020-11-13')),
                true);
        });
        it('is not between', () => {
            assert.strictEqual(
                utils.isBetweenDate(new Date('2020-11-12'), new Date('2020-11-15'), new Date('2020-11-17')),
                false);
        });
    });

    describe('newDateNDayAwayFromToday', () => {
        it('after 2', () => {
            assert.strictEqual(
                newDateNDayAwayFromToday(2).getTime(), newToday().getTime() + 86400000 * 2);
        });
        it('today', () => {
            assert.strictEqual(
                newDateNDayAwayFromToday(0).getTime(), newToday().getTime());
        });
        it('before 2', () => {
            assert.strictEqual(
                newDateNDayAwayFromToday(-2).getTime(), newToday().getTime() - 86400000 * 2);
        });
    });

});