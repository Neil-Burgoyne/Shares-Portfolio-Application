const fetch = require('cross-fetch');
let lastAssignedFetchSlot = 0;
const fetchFrequency = 10;
let i = 1;
const fetchData = async (endpoint, parser = null, parserArgs) => {
    //await waitForSlot();
    const url = `https://finnhub.io/api/v1/${endpoint}&token=${process.env.API_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    if (parser) return parser(data, parserArgs);
    else return data;
}

// const waitForSlot = async () => {
//     const timeSincePrevFetch = Date.now() - lastAssignedFetchSlot;
//     let sleepTime = 0;
//     if (timeSincePrevFetch < fetchFrequency) {
//         if (timeSincePrevFetch < 0) {
//             sleepTime = -timeSincePrevFetch + fetchFrequency;
//             lastAssignedFetchSlot += fetchFrequency;
//         } else {
//             sleepTime = fetchFrequency - timeSincePrevFetch;
//             lastAssignedFetchSlot += fetchFrequency;
//         }
//     } else {
//         lastAssignedFetchSlot = Date.now();
//     }
//     await sleep(sleepTime);
// }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = fetchData;

