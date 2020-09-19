class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const NoneToken = new HttpError('none access token', 400);
const ExpiredToken = new HttpError('expired access token', 410);
const InvaildToken = new HttpError('invaild access token', 401);

const InvalidDate = new HttpError('invalid date. Shape of date is yyyy-mm-dd.', 400);
const NotFoundDataInThisDate = new HttpError('Not found data in given date', 404);


const InvalidFloor = new HttpError('invalid floor. Range of floor must be 2~4.', 400);
const NotFoundDataInThisFloor = new HttpError('Not found data in given floor', 404);
const NotFoundTeacher = new HttpError('Not found Teacher given date', 400);

module.exports = {
    NoneToken,
    ExpiredToken,
    InvaildToken,

    InvalidDate,
    NotFoundDataInThisDate,

    InvalidFloor,
    NotFoundDataInThisFloor,
    NotFoundTeacher
}



