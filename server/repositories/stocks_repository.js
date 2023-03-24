const fetch = require('cross-fetch');

const fetchStockData = async (collection, stockSymbol) => {
    const apiKey = process.env.API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&outputsize=compact&apikey=${apiKey}`;

    const result = await fetch(url)
    const data = await result.json();
    return await data;

}

const parseData = (data) => {
    const metaData = data["Meta Data"];

    const stockObject = { symbol: metaData["2. Symbol"], cached: metaData["3. Last Refreshed"] }
    const rawSeriesData = data["Time Series (Daily)"]
    const parsed = Object.keys(rawSeriesData).map((key) => {
        const date = new Date(key).getTime();
        const item = rawSeriesData[key];
        return [date, Number(item["1. open"]), Number(item["2. high"]), Number(item["3. low"]), Number(item["4. close"])];
    }).reverse()
    stockObject.graphData = [parsed];
    return stockObject;
}

const getStockData = async (stocksCache, stockSymbol) => {
    const cachedData = await stocksCache.findOne({ symbol: stockSymbol })
    if (!cachedData) {
        console.log("noCache")
        const stockData = await fetchStockData(stocksCache, stockSymbol);
        await stocksCache.insertOne(parseData(stockData));
        return await stockData;
    } else {
        console.log("cache")
        return cachedData;
    }


}

module.exports = getStockData;