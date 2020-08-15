const configs = require('../configs');
const assert = require('assert');


describe('configs', () => {
    it('DB_PASSWORD', () => {
        assert.equal(DB_PASSWORD, '1111');     
    });
});

