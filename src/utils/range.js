const { InvalidRange } = require('../errors/utils');
const ServiceDate = require('./time');

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
    static newRangeWeek(month, week) { // monday ~ sumday
        const someday_in_week = ServiceDate.newDateStartOfMonth(month).addDays(7 * week - 1);
        const diff_to_monday = someday_in_week.getWeekday() - 1;
        const diff_to_firday = 7 - someday_in_week.getWeekday();

        const monday = someday_in_week.addDays(diff_to_monday * -1);
        const sunday = someday_in_week.addDays(diff_to_firday);

        return DateRange.newRange(monday, sunday);
    }
}

class PeriodRange extends Range {
    static newRange({ start_date, start_period}, { end_date, end_period}) {

        const start = Math.floor(start_date.valueOf() / 1000) * 1000 + Number(start_period);
        const end = Math.floor(end_date.valueOf() / 1000) * 1000 + Number(end_period);

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