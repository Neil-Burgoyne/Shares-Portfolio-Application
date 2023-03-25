const fetch = require('cross-fetch');

const finnHubURL = "https://finnhub.io/api/v1";
let lastUsedAPISlot = 0;

const parseOHLCData = (data, stockSymbol) => {
    const stockObject = { symbol: stockSymbol, cached: todaysDate() };
    stockObject.graphData = data.t.map((t, index) => {
        return [t * 1000, data.o[index], data.h[index], data.l[index], data.c[index]]
    }).reverse();
    stockObject.closingValue = stockObject.graphData[0][4];
    return stockObject;
}

const parseStockSymbols = async (data) => {
    const symbolsObject = { data: "stockSymbols", cached: todaysDate() }
    symbolsObject.symbols = data.map((symbol) => {
        return { symbol: symbol.symbol, name: symbol.description }
    });
    return symbolsObject;
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


const fetchStockSymbols = async () => {
    const apiKey = process.env.API_KEY;
    const url = `${finnHubURL}stock/symbol?exchange=US&currency=USD&token=${apiKey}`
    const result = await fetch(url);
    const stockSymbols = await result.json();
    return parseStockSymbols(stockSymbols);
}

const fetchData = async (endpoint, parser, parserArgs) => {
    const url = `https://finnhub.io/api/v1/${endpoint}&token=${process.env.API_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    return parser(data, parserArgs);
}

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

const getStockSymbols = async (stocksCache) => {
    const endpoint = "stock/symbol?exchange=US&currency=USD";
    const query = { data: "stockSymbols" }
    return await getData(stocksCache, query, endpoint, parseStockSymbols);
}

// const getStockSymbols = async (stocksCache) => {
//     const cachedData = await stocksCache.findOne({ data: "stockSymbols" })
//     if (!cachedData) {
//         console.log("noCache")
//         const stockSymbols = await fetchStockSymbols();
//         await stocksCache.insertOne(stockSymbols);
//         return stockData;
//     } else if (todaysDate() > cachedData.cached) {
//         console.log("updateCache")
//         const stockSymbols = await fetchStockSymbols();
//         await stocksCache.replaceOne({ data: "stockSymbols" }, stockSymbols);
//         return stockSymbols;
//     } else {
//         console.log("cache")
//         return cachedData;
//     }
// }

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

module.exports = { getStockData, getStockSymbols };