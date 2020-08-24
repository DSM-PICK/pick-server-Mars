const configs = require('../configs');
const assert = require('assert');

if(process.env.NODE_ENV == 'dev') {
    describe('configs', () => {
        it('DB_PASSWORD', () => {
            assert.equal(configs.DB_PASSWORD, '1111');     
        });
    });
}

