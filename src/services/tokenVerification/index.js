const crypto = require('crypto');
const fs = require('fs');
const { json } = require('express');
const { ExpiredToken, InvaildToken } = require('../../errors');

const { TOKEN_SECRET } = require('../../configs');


module.exports = (token) => {
    token = separateToken(token);

    if(isExpired(token)) {
        throw ExpiredToken;
    }

    if(isSelfContained(token) == false) {
        throw InvaildToken;
    }

    return true;
};

function separateToken(token) {
    const splited_token = token.split('.');  

    return {
        header: splited_token[0],
        payload: splited_token[1],
        signature: splited_token[2]
    }
}

function isExpired(token) {
    const token_exp_time = getExpTimeByPayload(token.payload);
    const today_time =  new Date().getTime() / 1000;
    if(token_exp_time < today_time ) {
        return true;
    }
    return false;
}
function getExpTimeByPayload(payload) {
    return JSON.parse(Buffer.from(payload,'base64').toString()).exp;
}

function isSelfContained(token_data) {
    const valid_signature = signToken(token_data.header, token_data.payload, TOKEN_SECRET);
    if(token_data.signature != valid_signature) {
        return false;
    }
    return true;
}
function signToken(header, payload, secret) {
    const binary_secrete = Buffer.from(secret, 'base64');
    return crypto.createHmac('sha256', binary_secrete)
        .update(header + '.' + payload)
        .digest('base64')
        .replace(/=/gi, '')
        .replace(/\+/gi, '-')
        .replace(/\//gi, '_');
}