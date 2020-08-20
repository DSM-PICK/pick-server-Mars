const assert = require('assert');
const verify_token = require('../../services/tokenVerification');


describe('jwt test', () => {

    // jwt, exp(unix time): 2500000000, id: teacher_id
    const valid_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MgdG9rZW4iLCJpZCI6InRlYWNoZXJfaWQiLCJleHAiOjI1MDAwMDAwMDB9.g47GleCQRN6blAtDGbh-foMHVAKo_txpklnwQqVZO1c"
    // jwt, exp: 1500000000, id: teacher_id
    const expired_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MgdG9rZW4iLCJpZCI6InRlYWNoZXJfaWQiLCJleHAiOjE1MDAwMDAwMDB9.5Lcl9WrarjUEj5nuKCt77hkAFjkI6xj-EUB0TyykV2U"
    // jwt, self-validation broken token, exp: 2500000000, id: teacher_id
    const broken_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MgdG9rZW4iLCJpZCI6InRlYWNoZXJfaWQiLCJleHAiOjI1MDAwMDAwMDB9.iqsGKtJLNr0hjxre8wlblnFzyCdDI1HlznndgusRiW4"

    it("valid", () => {
        assert.equal(verify_token(valid_token), true);
    });
    it("broken self-validation", () => {
        assert.equal(verify_token(broken_token), false);
    });
    it("expired", () => {
        assert.equal(verify_token(expired_token), false);
    });
});