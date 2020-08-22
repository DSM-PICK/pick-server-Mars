const verifyToken = require('../../services/tokenVerification');


module.exports = (req, res, next) => {
    try{
        verifyToken(req.get('Authentication'));
        next();
    } catch(e) {
        next(e);
    }
};



