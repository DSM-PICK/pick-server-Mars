class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

class NoneToken extends HttpError {
    constructor(message) {
        super(401, message);
    }
}
class ExpiredToken extends HttpError {
    constructor(message) {
        super(410, message);
    }
}
class InvalidToken extends HttpError {
    constructor(message) {
        super(403, message);
    }
}

const InvalidDate = new HttpError(400);
const NotFoundDataInThisDate = new HttpError(404);


const InvalidFloor = new HttpError(400);
const NotFoundDataInThisFloor = new HttpError(404);
const NotFoundTeacher = new HttpError(404);

const BadRequest = new HttpError(400);
const NotFound = new HttpError(404);

module.exports = {
    NoneToken,
    ExpiredToken,
    InvalidToken,

    InvalidDate,
    NotFoundDataInThisDate,

    InvalidFloor,
    NotFoundDataInThisFloor,
    NotFoundTeacher,

    BadRequest,
    NotFound
};



