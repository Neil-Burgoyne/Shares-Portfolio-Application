const fetch = require('cross-fetch');

const fetchStockGraphData = async (collection, stockSymbol) => {
    const apiKey = process.env.API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&outputsize=compact&apikey=${apiKey}`;

    const result = await fetch(url)
    const data = await result.json();
    return await data;

}
const getStockGraphData = async (collection, stockSymbol) => {
    const graphData = await fetchStockGraphData(collection, stockSymbol);
    return await graphData;
}

module.exports = getStockGraphData;