const middlewares = require('express').Router();

const token_verification_service = require('./tokenVerification');

middlewares.use(token_verification_service);

module.exports = middlewares;