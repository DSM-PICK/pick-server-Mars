const assert = require('assert');
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
});