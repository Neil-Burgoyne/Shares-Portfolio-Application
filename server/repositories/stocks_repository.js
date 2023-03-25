const fetch = require('cross-fetch');
const finnHubURL = "https://finnhub.io/api/v1/"

const fetchStockData = async (collection, stockSymbol) => {
    const apiKey = process.env.API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${apiKey}`;
    const result = await fetch(url)
    const stockData = await result.json();
    const parsedStockData = parseData(stockData);
    return parsedStockData;
}

const parseData = (data) => {
    const metaData = data["Meta Data"];
    const stockObject = { symbol: metaData["2. Symbol"], cached: todaysDate() };
    const rawSeriesData = data["Time Series (Daily)"];
    const parsedSeriesData = Object.keys(rawSeriesData).map((key) => {
        const date = new Date(key).getTime();
        const item = rawSeriesData[key];
        return [date, Number(item["1. open"]), Number(item["2. high"]), Number(item["3. low"]), Number(item["4. close"])];
    }).reverse();
    stockObject.closingValue = parsedSeriesData[0][4];
    stockObject.graphData = parsedSeriesData;
    return stockObject;
}

const fetchStockDataFHub = async (stockSymbol) => {
    const apiKey = process.env.API_KEY_FINNHUB;
    const url = `${finnHubURL}symbol=${stockSymbol}/stock/candle?symbol=${stockSymbol}&resolution=Doutputsize=compact&apikey=${apiKey}`;
    const result = await fetch(url)
    const stockData = await result.json();
    const parsedStockData = parseData(stockData);
    return parsedStockData;
}

const parseDataFinnHub = (data) => {

    return stockObject;
}

const getStockData = async (stocksCache, stockSymbol) => {
    const cachedData = await stocksCache.findOne({ symbol: stockSymbol })
    if (!cachedData) {
        console.log("noCache")
        const stockData = await fetchStockData(stocksCache, stockSymbol);
        await stocksCache.insertOne(stockData);
        return await stockData;
    } else if (todaysDate() > cachedData.cached) {
        console.log("updateCache")
        const stockData = await fetchStockData(stocksCache, stockSymbol);
        await stocksCache.replaceOne({ symbol: stockSymbol }, stockData);
        return await stockData;
    }
    else {
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
    console.log(parsedToday)
    return parsedToday;
}

const dateRange = () => {
    const today = new Date().toISOString().split('T')[0];;
    const todaySplit = today.split("-")
    const lastYear = new Date(`${todaySplit[0] - 1}-${todaySplit[1]}-${todaySplit[2]}`);
    return { today: Date.parse(today), lastYear: Date.parse(lastYear) };
}
console.log(dateRange())
module.exports = getStockData;