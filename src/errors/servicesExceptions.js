class InvalidDateException extends Error {
    constructor() {
        super('Given date is not valid');
    }
}

class NotFoundDataException extends Error{
    constructor() {
        super('Couldn\'t found data in given date');
    }
}

module.exports = {
    InvalidDateException,
    NotFoundDataException
};