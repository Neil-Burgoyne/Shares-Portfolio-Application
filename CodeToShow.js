// stocks_router.js 
router.get('/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const data = await getStockData(symbol);
        res.json(data);
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ status: 500, error: err })
    }
})

// stock_repository.js

const getStockData = async (stockSymbol) => {
    const query = { symbol: stockSymbol };
    const { today, lastYear } = yearToDateInSeconds();
    const endpoint = `stock/candle?symbol=${stockSymbol}&resolution=D&from=${lastYear}&to=${today}`;
    return await getData(query, endpoint, parseOHLCData, stockSymbol);
}

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

// fetch_finnhub.js

const fetchData = async (endpoint, parser = null, parserArgs) => {
    const url = `https://finnhub.io/api/v1/${endpoint}&token=${process.env.API_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    if (parser) return parser(data, parserArgs);
    else return data;
}

// stock_data_parsers.js

const parseOHLCData = async (data, { symbol, name }) => {
    const stockObject = { symbol, name };
    const graphData = data.t.map((t, index) => {
        return [t * 1000, data.o[index], data.h[index], data.l[index], data.c[index], data.v[index]]
    });
    stockObject.graphData = graphData;
    stockObject.closingValue = stockObject.graphData[0][4];
    return stockObject;
}
