const ErrorCodes = require('./errorCode');

class RequestException extends Error {
    constructor(message, error_code) {
        super(message);
        this.status = error_code;
    }
}
class BadRequestException extends RequestException {
    constructor(message) {
        if (message) {
            super(message, ErrorCodes.BAD_REQUEST);
        }
        else {
            super("전달된 값이 올바르지 않습니다.", ErrorCodes.BAD_REQUEST);
        }
    }
}
class InvalidFloorException extends BadRequestException {
    constructor() {
        super('올바르지 않은 층입니다.');        
    }
}
class InvalidDateException extends BadRequestException {
    constructor() {
        super('올바르지 않은 날짜 형식입니다.');        
    }
}
class InvalidTermException extends BadRequestException {
    constructor() {
        super('올바르지 않은 기간입니다.');        
    }
}


module.exports = {
    BadRequestException,
    InvalidFloorException,
    InvalidDateException,
    InvalidTermException,
}