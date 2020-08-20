const crypto = require('crypto');
const fs = require('fs');
const { json } = require('express');

const { TOKEN_SECRET } = require('../../configs');

module.exports = (token) => {
    const splited_token = token.split('.');
  
    const header = splited_token[0];
    const payload = splited_token[1];
    const signature = splited_token[2];


    const parsed_payload = JSON.parse(Buffer.from(payload,'base64').toString());
    if(parsed_payload.exp < new Date().getTime() / 1000) {
        return false;
    }

    const secrete = TOKEN_SECRET;
    const binary_secrete = Buffer.from(secrete, 'base64');

    const valid_signature = crypto.createHmac('sha256', binary_secrete)
        .update(header + '.' + payload)
        .digest('base64')
        .replace(/=/gi, '')
        .replace(/\+/gi, '-')
        .replace(/\//gi, '_');

    if(signature != valid_signature) {
        return false;
    }

    return true;
};