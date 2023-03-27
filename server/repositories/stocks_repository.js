const { parseOHLCData } = require('../parsers/stock_data_parsers')
const fetchData = require("../external_api/fetch_finnhub")
const { todaysDate, yearToDateInSeconds } = require("../utilities/date_utilities");
let stocksCache = null;

const getData = async (query, url, parser, parserArgs) => {
    const cachedData = await stocksCache.findOne(query)
    if (!cachedData) {
        console.log("noCache")
        const stockData = await fetchData(url, parser, parserArgs);
        stockData.cached = todaysDate();
        await stocksCache.insertOne(stockData);
        return await stockData;
    } else if (todaysDate() > cachedData.cached) {
        console.log("updateCache")
        const parserArgs = { symbol: cachedData.symbol, name: cachedData.name }
        const stockData = await fetchData(url, parser, parserArgs);
        stockData.cached = todaysDate();
        await stocksCache.updateOne(query, { $set: stockData });
        return await stockData;
    } else {
        console.log("cache")
        return cachedData;
    }
}

const getStockData = async (stockSymbol) => {
    const query = { symbol: stockSymbol };
    const { today, lastYear } = yearToDateInSeconds();
    const endpoint = `stock/candle?symbol=${stockSymbol}&resolution=D&from=${lastYear}&to=${today}`;
    return await getData(query, endpoint, parseOHLCData, stockSymbol);
}

const getStocksData = async () => {
    const stocksObjects = await stocksCache.find();
    const stocksArray = await stocksObjects.toArray();
    const stocksData = []
    for (let i = 0; i < stocksArray.length; i++) {
        const stockData = await getStockData(stocksArray[i].symbol)
        stocksData.push(stockData);
    }
    return stocksData;
}

const getStocksDataFromArray = async (stocksList) => {
    const stocksData = [];
    for (let i = 0; i < stocksList.length; i++) {
        const stockData = await getStockData(stocksList[i])
        stocksData.push(stockData);
    }
    return stocksData;
}

const setStocksCache = (stocksCollection) => {
    stocksCache = stocksCollection;
}


module.exports = { getStockData, getStocksData, setStocksCache, getStocksDataFromArray };