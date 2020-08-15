const configs = require('../configs');
const assert = require('assert');


describe('configs', () => {
    it('DB_PASSWORD', () => {
        assert.equal(configs.DB_PASSWORD, '1111');     
    });
});

