import * as DateFormat from './DateFormat';

export function formatIf(date, format) {
    if(!format) return date;
    return DateFormat.format.date(date, format);
}

export function today(format) {
    return getDate(0, format);
}

export function yestoday(format) {
    var result = getDate(-1);
    return formatIf(result, format);
}

export function getDate(delta, format) {
    delta = delta * 1000 * 60 * 60 * 24;
    var date = new Date(Date.now() + delta);
    return formatIf(date, format);
}

export function getDateRelativeTo(date, delta, format) {
	delta = delta * 1000 * 60 * 60 * 24;
	return formatIf(new Date(date.getTime() + delta), format);
}

export function min(dateA, dateB) {
	return dateA.getTime() > dateB.getTime() ? dateB : dateA;
}

export function deltaDays(dateA, dateB) {
	return Math.ceil((dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24));
}

export function lastWeek(format) {
    var result = getDate(-7);
    return getWeek(result, format);
}
export function lastWeekDay(date) {
    let day = date.getDay();
    if(day == 6) {
        return formatIf(date, "yyyy-MM-dd");
    } else {
        date = date.setDate(date.getDate() - (day + 1));
        //date = new Date(date.getTime() - (1000 * 60 * 60 * 24 * (day + 1)));
    }
    return formatIf(date, "yyyy-MM-dd");
}

export function getWeek(date, format) {
    var year = date.getFullYear(),
        month = date.getMonth(),
        days = date.getDate();
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
    var week = Math.ceil((days - (7-yearFirstDay)) / 7);
    if(format) {
        return formatIf(date, format).replace('WK', week);
    }
    return week;
}

export function lastMonth(format) {
    var now = new Date();
    return getDate(-now.getDate()-10, format)
}

export function lastMonthDay(date) {
    return "20" + new Date(date.getYear(),date.getMonth() + 1).toJSON().substring(2,10);
}

export function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

export function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (exports.isLeapYear(year) ? 29 : 28);
}
