const { getStocksDataFromList } = require('../repositories/stocks_repository');
const { getUniqueValues } = require('../utilities/array_utilities')
const { parseUserData } = require('../parsers/user_data_parser');

let userData = {}

const getData = async (userCollection, query, parser, parserArgs) => {
    const user = await userCollection.findOne(query);
    const uniqueStockSymbols = getUniqueValues(user.shareTransactions, "stockSymbols");
    const stockData = await getStocksDataFromList(uniqueStockSymbols)

    return await stockData;
}

const getUserData = async (userCollection, stocksCollection, id) => {
    const query = { _id: id };
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

const setUserData = (userCollection) => {
    userData = userCollection;
}

module.exports = { getUserData, getStocksData, setUserData };