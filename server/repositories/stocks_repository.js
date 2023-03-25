const { parseOHLCData, parseStockSymbols } = require('../parsers/stock_data_parsers')
const fetchData = require("../external_api/fetch_finnhub")
const { todaysDate, yearToDateInSeconds } = require("../utilities/date_utilities");

const getData = async (stocksCache, query, url, parser, parserArgs) => {
    const cachedData = await stocksCache.findOne(query)
    if (!cachedData) {
        console.log("noCache")
        const stockData = await fetchData(url, parser, parserArgs);
        await stocksCache.insertOne(stockData);
        return await stockData;
    } else if (todaysDate() > cachedData.cached) {
        console.log("updateCache")
        const stockData = await fetchData(url, parser, parserArgs);
        await stocksCache.replaceOne({ query }, stockData);
        return await stockData;
    } else {
        console.log("cache")
        return cachedData;
    }
}

const getStockData = async (stocksCache, stockSymbol) => {
    const query = { symbol: stockSymbol };
    const { today, lastYear } = yearToDateInSeconds();
    const endpoint = `stock/candle?symbol=${stockSymbol}&resolution=D&from=${lastYear}&to=${today}`;
    const parserArgs = { stockSymbol };
    return await getData(stocksCache, query, endpoint, parseOHLCData, parserArgs);
}

const getStockSymbols = async (stocksCache) => {
    const query = { data: "stockSymbols" }
    const endpoint = "stock/symbol?exchange=US&currency=USD";
    return await getData(stocksCache, query, endpoint, parseStockSymbols);
}

module.exports = { getStockData, getStockSymbols };