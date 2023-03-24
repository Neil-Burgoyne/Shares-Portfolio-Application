const fetch = require('cross-fetch');

const fetchStockData = async (collection, stockSymbol) => {
    const apiKey = process.env.API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${apiKey}`;
    const result = await fetch(url)
    const data = await result.json();
    return await data;
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
    stockObject.graphData = [parsedSeriesData];
    return stockObject;
}

const getStockData = async (stocksCache, stockSymbol) => {
    const cachedData = await stocksCache.findOne({ symbol: stockSymbol })
    if (!cachedData || todaysDate() > cachedData.cached) {
        console.log("noCache")
        const stockData = await fetchStockData(stocksCache, stockSymbol);
        const parsedStockData = parseData(stockData);
        await stocksCache.insertOne(parsedStockData);
        return await parsedStockData;
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
    console.log(parsedToday)
    return parsedToday;
}


module.exports = getStockData;