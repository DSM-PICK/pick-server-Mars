const { DateTime } = require('luxon');


module.exports = class ServiceDate {
    constructor(arg) {
        if (arg instanceof DateTime) {
            this.date = arg;
        }
        else if (arg) {
            this.date = newDateFromISO(arg);
        }
        else {
            this.date = newToday();
        }
    }
    toString() {
        return this.date.toISODate();
    }
    toJSDate() {
        return new Date(this.toString());
    }
    isSame(date) {
        return equal(this, date);
    }
    valueOf() {
        return this.date.valueOf();
    }
    addDays(days) {
        return new ServiceDate(this.date.plus({days: days}));
    }
    static newDateEndOfSchoolYear() {
        const today = newToday();
        let next_school_year = getDatesSchoolYear(today) + 1;
        
        return new ServiceDate(newDate(next_school_year, 1, 31));
    }
    static newDateOrdernal(order) {
        return new ServiceDate(newDateOrdernal(order));
    }
}


// Date functions
function equal(dt1, dt2) {
    return +dt1 === +dt2;
}

function setServiceZone(date_time) {
    return date_time.setZone('Asia/Seoul', { keepLocalTime: true });
}
function removeTime(date_time) {
    return date_time.set({hour:0, minute:0, millisecond:0, second:0});
}

function newToday() {
    return generateDateByDateTime(DateTime.local());
}
function newDateFromISO(iso) {
    return generateDateByDateTime(DateTime.fromISO(iso));
}
function newDate(year, month, day) {
    return generateDateByDateTime(DateTime.fromObject({year: year, month: month, day: day}));
}
function newDateOrdernal(order) {
    return generateDateByDateTime(DateTime.fromObject({ordinal: order}));
}
function generateDateByDateTime(date_time) {
    return setServiceZone(removeTime(date_time));
}

//Service Date funcitons 
function getDatesSchoolYear(date) {
    return date.month >= 3? date.year : date.year - 1;
}