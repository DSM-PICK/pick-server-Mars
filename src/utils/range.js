const { InvalidRange } = require('../errors/utils');

class Range {
    static isConflict(range1, range2) {
        return (range1.start <= range2.end && range1.start >= range2.start)
        || (range1.end <= range2.end && range1.end >= range2.start)
        || (range1.start >= range2.start && range1.end <= range2.start)
        || (range1.start >= range2.end && range1.end <= range2.end);
    }
}

class DateRange extends Range{
    constructor(date1, date2) {
        if (date1 > date2) {
            throw InvalidRange(`${date1} is not faster than ${date2}`);
        }
        this.start = date1;
        this.end = date2;
    }
}

module.exports = {
    DateRange
}