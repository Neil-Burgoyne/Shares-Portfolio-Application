const fetch = require('cross-fetch');


const fetchData = async (endpoint, parser, parserArgs) => {
    const url = `https://finnhub.io/api/v1/${endpoint}&token=${process.env.API_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    return parser(data, parserArgs);
}

module.exports = fetchData;