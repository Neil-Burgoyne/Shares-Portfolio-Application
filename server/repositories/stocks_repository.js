const { parseOHLCData } = require('../parsers/stock_data_parsers')
const fetchData = require("../external_api/fetch_finnhub")
const { todaysDate, yearToDateInSeconds } = require("../utilities/date_utilities");

const getData = async (stocksCache, query, url, parser, parserArgs) => {
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

const getStockData = async (stocksCache, stockSymbol) => {
    const query = { symbol: stockSymbol };
    const { today, lastYear } = yearToDateInSeconds();
    const endpoint = `stock/candle?symbol=${stockSymbol}&resolution=D&from=${lastYear}&to=${today}`;
    return await getData(stocksCache, query, endpoint, parseOHLCData, stockSymbol);
}

const getStocksData = async (stocksCache) => {
    const stocksObjects = await stocksCache.find();
    const stocksArray = await stocksObjects.toArray();
    const stocksData = await getStocksDatafromList(stocksCache, stocksArray);
    return stocksData;
}

const getStocksDatafromList = async (stocksCache, stocksList) => {
    const stocksData = [];
    for (let i = 0; i < stocksList.length; i++) {
        const stockData = await getStockData(stocksCache, stocksList[i].symbol)
        stocksData.push(stockData);
    }
    return stocksData;
}




module.exports = { getStockData, getStocksData };