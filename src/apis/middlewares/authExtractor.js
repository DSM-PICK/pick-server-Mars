function separateToken(token) {
    const splited_token = token.split('.');  

    return {
        header: splited_token[0],
        payload: splited_token[1],
        signature: splited_token[2]
    }
}

function getIdByPayload(payload) {
    return JSON.parse(Buffer.from(payload,'base64').toString()).id;
}



module.exports = (req, res, next) => {
    const payload = separateToken(req.get('Authorization')).payload;
    req.auth = getIdByPayload(payload);
    next();
};