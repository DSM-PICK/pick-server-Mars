function newTerm(date1, date2) {
    const start = date1 < date2 ? date1 : date2;
    const end = date1 > date2 ? date1 : date2;

    return {
        start,
        end
    }
}

function newTermWithPeriod(start_date, start_period, end_date, end_period) {
    return {
        start_date,
        start_period,
        end_date,
        end_period,
    };
}

function isBetweenInTerm(term, date) {
    return isBetweenDate(term.start, term.end, date);
}


function validDateString(date_string) {
    const frame = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;

    return frame.test(date_string);
}

function dateToString(date) { 
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function isBetweenDate(a_date, b_date, target_date) {
    let a_time = a_date.getTime();
    let b_time = b_date.getTime();
    const target_time = target_date.getTime();

    if(a_time > b_time) {
        const temp_time = b_time;
        b_time = a_time;
        a_time = temp_time;
    }
    b_time += 86400000 - 1;

    return a_time <= target_time && b_time >= target_time;
}

function newToday() {
    return new Date(dateToString(new Date()));
}

function isConflictRange(range1, range2) {
    return (range1.start <= range2.end && range1.start >= range2.start)
        || (range1.end <= range2.end && range1.end >= range2.start)
        || (range1.start >= range2.start && range1.end <= range2.start)
        || (range1.start >= range2.end && range1.end <= range2.end);
}

function newRange(start, end) {
    return {
        start: start,
        end: end
    };
}

function convertDaytoTime(day) {
    return day * 86400000;
}

function addDay(date, day) {
    return new Date(date.getTime() + convertDaytoTime(day));
}

function newDateNDayAwayFromToday(day) {
    return addDay(newToday(), day);
}

function getFirstDateOfNextYear() {
    return new Date(newToday().getUTCFullYear() + 1 + '-01-01');
}

function getLastDateOfLastYear() {
    return new Date(newToday().getUTCFullYear() - 1 + '-12-31');
}

module.exports = {
    newTerm,
    newTermWithPeriod,
    isBetweenInTerm,
    validDateString,
    dateToString,
    isBetweenDate,
    newToday,
    isConflictRange,
    newRange,
    addDay,
    newDateNDayAwayFromToday,
    getFirstDateOfNextYear,
    getLastDateOfLastYear
}
