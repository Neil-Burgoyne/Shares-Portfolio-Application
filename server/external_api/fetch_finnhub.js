const fetch = require('cross-fetch');
let lastAssignedFetchSlot = 0;
const fetchFrequency = 10;
let i = 1;
const fetchData = async (endpoint, parser = null, parserArgs) => {
    //await waitForSlot();
    console.log(endpoint)
    const url = `https://finnhub.io/api/v1/${endpoint}&token=${process.env.API_KEY}`;

    const result = await fetch(url);
    const data = await result.json();

    if (parser) return parser(data, parserArgs);
    else return data;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = fetchData;
