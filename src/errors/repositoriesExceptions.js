class NotFoundDataException extends Error {
    constructor() {
        super('Couldn\'t found data');
    }
}

module.exports = {
    NotFoundDataException
}