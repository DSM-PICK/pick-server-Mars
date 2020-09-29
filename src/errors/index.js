class HttpError extends Error {
    constructor(status) {
        // super(message);
        this.status = status;
    }
}

const NoneToken = new HttpError(401);
const ExpiredToken = new HttpError(410);
const InvaildToken = new HttpError(403);

const InvalidDate = new HttpError(400);
const NotFoundDataInThisDate = new HttpError(404);


const InvalidFloor = new HttpError(400);
const NotFoundDataInThisFloor = new HttpError(404);
const NotFoundTeacher = new HttpError(404);

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



