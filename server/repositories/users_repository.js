const { getStocksDataFroList } = require('../repositories/stocks_repository')
const { parseUserData } = require('../parsers/user_data_parsers');

const getData = async (userCollection, query, parser, parserArgs) => {
    const user = await userCollection.findOne(query);
    const currentStockValues =
        await userData.updateOne(query, { $set: stockData });
    return await stockData;
}

const getUserData = async (userCollection,) => {
    const query = { _id };

    return await getData(userCollection, query, parseUserData);
}

const getStocksData = async (stocksCache) => {
    const stocksObjects = await stocksCache.find();
    const stocksArray = await stocksObjects.toArray();
    const stocksData = [];
    for (let i = 0; i < stocksArray.length; i++) {
        const stockData = await getStockData(stocksCache, stocksArray[i].symbol)
        stocksData.push(stockData);
    }
    return stocksData;
}



module.exports = { getStockData, getStocksData };