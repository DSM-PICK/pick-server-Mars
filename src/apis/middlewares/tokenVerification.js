const verifyToken = require('../../services/tokenVerification');


module.exports = () => {
    return (req, res, next) => {
        try{
            verifyToken(req.body.Authentication);
            next();
        } catch(e) {
            next(e);
        }
    }
}



