const { getStocksDataFromArray } = require('../repositories/stocks_repository');
const { getUniqueValues } = require('../utilities/array_utilities')
const { parseUserAssets } = require('../parsers/user_data_parser');
const ObjectID = require("mongodb").ObjectID

let userData = {}

const getData = async (query) => {
    const user = await userCollection.findOne(query);
    console.log(user)
    const uniqueStockSymbols = getUniqueValues(user.shareTransactions, "stockSymbol");
    const stockData = await getStocksDataFromArray(uniqueStockSymbols)
    user.portfolio = parseUserAssets(user, stockData)
    return await user;
}

const getUserData = async (id) => {
    const query = { _id: ObjectID(id) };
    const userData = await getData(query);
    return userData;

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

const setUserCollection = (userColl) => {
    userCollection = userColl;
}

module.exports = { getUserData, setUserCollection };