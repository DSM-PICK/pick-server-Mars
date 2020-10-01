const middlewares = require('express').Router();

const token_verification_service = require('./tokenVerification');
const authExtractor = require('./authExtractor');

middlewares.use(token_verification_service);
middlewares.use(authExtractor);

module.exports = middlewares;