const { InvalidRange } = require('../errors/utils');

class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    static isConflict(range1, range2) {
        return (range1.start <= range2.end && range1.start >= range2.start)
        || (range1.end <= range2.end && range1.end >= range2.start)
        || (range1.start >= range2.start && range1.end <= range2.start)
        || (range1.start >= range2.end && range1.end <= range2.end);
    }
    isInclude(item) {
        return this.start <= item && this.end >= item;
    }
}

class DateRange extends Range{
    static newRange(start, end) {
        if(start > end) {
            throw new InvalidRange(`${start} is not faster than ${end}`);
        }

        const new_range = new DateRange(start, end);
        new_range.start = start;
        new_range.end = end;
        
        return new_range;
    }
}

class PeriodRange extends Range {
    static newRange({ start_date, start_period}, { end_date, end_period}) {

        const start = Math.floor(start_date.valueOf / 1000) * 1000 + start_period;
        const end = Math.floor(end_date.valueOf / 1000) * 1000 + end_period;

        if(start > end) {
            throw new InvalidRange(`${start} is not faster than ${end}`);
        }

        const new_range = new DateRange(start, end);
        new_range.start = start;
        new_range.end = end;
        
        return new_range;
    }
}

module.exports = {
    DateRange,
    PeriodRange
}