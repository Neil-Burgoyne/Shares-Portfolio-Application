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
    const today = new Date().toISOString().split('T')[0];;
    const todaySplit = today.split("-")
    const lastYear = new Date(`${todaySplit[0] - 1}-${todaySplit[1]}-${todaySplit[2]}`);
    return { today: Date.parse(today) / 1000, lastYear: Date.parse(lastYear) / 1000 };
}

module.exports = { todaysDate, yearToDateInSeconds };