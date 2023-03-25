const fetch = require('cross-fetch');
const finnHubURL = "https://finnhub.io/api/v1/"

const parseOHLCData = (stockSymbol, data) => {
    const stockObject = { symbol: stockSymbol, cached: todaysDate() };
    stockObject.graphData = data.t.map((t, index) => {
        return [t * 1000, data.o[index], data.h[index], data.l[index], data.c[index]]
    }).reverse();
    stockObject.closingValue = stockObject.graphData[0][4];
    return stockObject;
}

const fetchStockOHLCData = async (stockSymbol) => {
    const apiKey = process.env.API_KEY;
    const { today, lastYear } = dateRange();
    const url = `${finnHubURL}stock/candle?symbol=${stockSymbol}&resolution=D&from=${lastYear}&to=${today}&token=${apiKey}`;
    const result = await fetch(url);
    const stockData = await result.json();
    const parsedStockData = parseOHLCData(stockSymbol, stockData);
    return parsedStockData;
}

const getStockData = async (stocksCache, stockSymbol) => {
    const cachedData = await stocksCache.findOne({ symbol: stockSymbol })
    if (!cachedData) {
        console.log("noCache")
        const stockData = await fetchStockOHLCData(stockSymbol);
        await stocksCache.insertOne(stockData);
        return await stockData;
    } else if (todaysDate() > cachedData.cached) {
        console.log("updateCache")
        const stockData = await fetchStockOHLCData(stocksCache, stockSymbol);
        await stocksCache.replaceOne({ symbol: stockSymbol }, stockData);
        return await stockData;
    } else {
        console.log("cache")
        return cachedData;
    }
}

const todaysDate = () => {
    const today = new Date(Date.now());
    let day = today.getDate();
    if (day < 10) day = `0${day}`
    let month = today.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    const parsedToday = Number(`${today.getFullYear()}${month}${day}`)
    return parsedToday;
}

const dateRange = () => {
    const today = new Date().toISOString().split('T')[0];;
    const todaySplit = today.split("-")
    const lastYear = new Date(`${todaySplit[0] - 1}-${todaySplit[1]}-${todaySplit[2]}`);
    return { today: Date.parse(today) / 1000, lastYear: Date.parse(lastYear) / 1000 };
}

module.exports = getStockData;