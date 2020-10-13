function newTerm(date1, date2) {
    const start = date1 < date2 ? date1 : date2;
    const end = date1 > date2 ? date1 : date2;

    return {
        start,
        end
    }
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

module.exports = {
    newTerm,
    isBetweenInTerm,
    validDateString,
    dateToString,
    isBetweenDate,
    newToday
}
