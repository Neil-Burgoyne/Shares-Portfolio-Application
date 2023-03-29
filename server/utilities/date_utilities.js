const { SYSTEM_NAMESPACE_COLLECTION } = require("mongodb/lib/db");

const todaysDate = () => {
    const today = new Date(Date.now());
    let day = today.getDate();
    if (day < 10) day = `0${day}`
    let month = today.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    const parsedToday = Number(`${today.getFullYear()}${month}${day}`)
    return parsedToday;
}

const yearToDateInSeconds = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaySplit = today.split("-")
    const lastYear = new Date(`${todaySplit[0] - 1}-${todaySplit[1]}-${todaySplit[2]}`);
    return { today: Date.parse(today) / 1000, lastYear: Date.parse(lastYear) / 1000 };
}

const monthToDate = () => {
    const todayRaw = new Date().toISOString().split('T')[0];
    const todaySplit = todayRaw.split("-")
    const previousMonth = prevMonth(todaySplit[1])
    if (todaySplit[2] < 10) todaySplit[2] = `0${todaySplit[2]}`
    const today = todaySplit.join("-")
    const lastMonth = `${todaySplit[0]}-${previousMonth}-${todaySplit[2] > 28 ? 28 : todaySplit[2]}`
    return { today, lastMonth }
}

const prevMonth = (month) => {
    newMonth = Number(month) - 1;
    if (newMonth < 1) newMonth = 12 - newMonth;
    if (newMonth < 10) newMonth = `0${newMonth}`
    else newMonth = `${newMonth}`
    return newMonth;
}
module.exports = { todaysDate, yearToDateInSeconds, monthToDate };
