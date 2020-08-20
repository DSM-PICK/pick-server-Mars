class HttpError extends Error {
    constructor(message, status, code) {
      super(message);
      this.status = status;
      this.code = code;
    }
}


const ExpiredToken = new HttpError('expired access token', 410, '');
const InvaildToken = new HttpError('invaild access token', 401, '');


module.exports = {
    ExpiredToken,
    InvaildToken
}


  
