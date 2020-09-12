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

class InvalidFloorException extends Error {
    constructor() {
        super('Given floor is not valid');
    }
}

class MismatchToRelationDatas extends Error {
    constructor() {
        super('Mismatch to relation datas');
    }
}

module.exports = {
    InvalidDateException,
    NotFoundDataException,
    InvalidFloorException,
    MismatchToRelationDatas
};