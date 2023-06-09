const { parseOHLCData } = require('../parsers/stock_data_parsers')
const fetchData = require("../external_api/fetch_finnhub")
const { todaysDate, yearToDateInSeconds, monthToDate } = require("../utilities/date_utilities");
let stocksCache = null;

const getData = async (query, url, parser, parserArgs) => {
    const cachedData = await stocksCache.findOne(query)
    if (!cachedData) {
        console.log(query.symbol, "noCache")
        const stockData = await fetchData(url, parser, parserArgs);
        stockData.cached = todaysDate();
        await stocksCache.insertOne(stockData);
        return await stockData;
    } else if (todaysDate() > cachedData.cached) {
        console.log(query.symbol, "updateCache")
        const parserArgs = { symbol: cachedData.symbol, name: cachedData.name }
        const stockData = await fetchData(url, parser, parserArgs);
        stockData.cached = todaysDate();
        await stocksCache.updateOne(query, { $set: stockData });
        return await stockData;
    } else {
        console.log(query.symbol, "cache")
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
    const stocksData = [];
    for (let i = 0; i < stocksArray.length; i++) {
        const stockData = await getStockData(stocksArray[i].symbol);
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

const getNews = async (symbol = null) => {
    let endpoint;
    const { today, lastMonth } = monthToDate()
    if (!symbol) endpoint = "/news?category=general"
    else endpoint = `/company-news?symbol=${symbol}&from=${lastMonth}&to=${today}`
    const newsData = await fetchData(endpoint)
    return newsData;
}

const getImage = async (symbol) => {
    const endpoint = `/stock/profile2?symbol=${symbol}`
    const profile = await fetchData(endpoint)
    const logo = profile.logo
    await stocksCache.updateOne({ symbol: symbol }, { $set: { logo } })
    return logo
}

module.exports = { getStockData, getStocksData, setStocksCache, getStocksDataFromArray, getNews, getImage };