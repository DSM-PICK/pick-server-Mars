const assert = require('assert');
const ServiceDate = require('../../utils/time');

describe('ServiceDate test', () => {
    it('toString test', () => {
        const sd = new ServiceDate('2020-12-15');
        assert.deepStrictEqual(sd.toString(), '2020-12-15');
    });
});