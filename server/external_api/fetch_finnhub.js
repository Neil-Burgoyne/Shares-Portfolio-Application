const fetch = require('cross-fetch');
let lastAssignedFetchSlot = 0;
const fetchFrequency = 1000;

const fetchData = async (endpoint, parser, parserArgs) => {
    await waitForSlot();
    const url = `https://finnhub.io/api/v1/${endpoint}&token=${process.env.API_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    return parser(data, parserArgs);
}

const waitForSlot = async () => {
    const timeSincePrevFetch = Date.now() - lastAssignedFetchSlot;
    let sleepTime = 0;
    if (timeSincePrevFetch < fetchFrequency) {
        if (timeSincePrevFetch < 0) {
            sleepTime = (lastAssignedFetchSlot - Date.now()) + fetchFrequency;
            lastAssignedFetchSlot += sleepTime;
        } else {
            sleepTime = fetchFrequency - (Date.now() - lastAssignedFetchSlot);
            lastAssignedFetchSlot += sleepTime;
        }
    } else {
        lastAssignedFetchSlot = Date.now();
    }
    await sleep(sleepTime);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = fetchData;