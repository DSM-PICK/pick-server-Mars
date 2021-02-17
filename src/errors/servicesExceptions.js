const ErrorCodes = require('./errorCode');

class ServiceException extends Error {
    constructor(message, error_code) {
        super(message);
        this.status = error_code;
    }
}

class NotFoundDataException extends ServiceException{
    constructor() {
        super('주어진 데이터로는 찾을 수 없습니다.', ErrorCodes.NOT_FOUND);
    }
}

class ConflictData extends ServiceException {
    constructor() {
        super('데이터에 충돌이 있습니다.', ErrorCodes.CONFLICT);
    }    
}

module.exports = {
    NotFoundDataException,
    ConflictData
};