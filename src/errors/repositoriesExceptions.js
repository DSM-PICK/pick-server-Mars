class NotFoundDataException extends Error {
    constructor() {
        super('Couldn\'t found data');
    }
}

class NotFoundRelatedDataException extends Error {

}

module.exports = {
    NotFoundDataException,
    NotFoundRelatedDataException
}