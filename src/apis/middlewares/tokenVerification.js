const verifyToken = require('../../services/tokenVerification');


module.exports = (req, res, next) => {
    try{
        verifyToken(req.get('Authorization'));
        next();
    } catch(e) {
        next(e);
    }
};



