class HttpError extends Error {
    constructor(message, status, code) {
      super(message);
      this.status = status;
      this.code = code;
    }
}


const ExpiredToken = new HttpError('expired access token', 410, '');
const InvaildToken = new HttpError('invaild access token', 401, '');

const InvalidDate = new HttpError('invalid date. Shape of date is yyyy-mm-dd.', 400, '');
const NotFoundDataInThisDate = new HttpError('Not found data in given date', 404, '');

module.exports = {
    ExpiredToken,
    InvaildToken,

    InvalidDate,
    NotFoundDataInThisDate
}


  
