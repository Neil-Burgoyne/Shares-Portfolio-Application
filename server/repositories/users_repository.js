const { getStocksDataFromArray } = require('../repositories/stocks_repository');
const { getUniqueValues } = require('../utilities/array_utilities');
const { parseUserData } = require('../parsers/user_data_parser');
const { todaysDate } = require('../utilities/date_utilities');
const ObjectID = require("mongodb").ObjectID

let userCollection = {}

const getData = async (user) => {
    const uniqueStockSymbols = getUniqueValues(user.shareTransactions, "stockSymbol");
    const stockData = await getStocksDataFromArray(uniqueStockSymbols)
    parseUserData(user, stockData)
    return await user;
}

const getUserData = async (id) => {
    const user = await userCollection.findOne({ _id: ObjectID(id) });
    const userData = await getData(user);
    return userData;

}

const getUsersData = async () => {
    const users = await userCollection.find();
    const usersArray = await users.toArray();
    const usersData = [];
    for (let i = 0; i < usersArray.length; i++) {
        const userData = await getData(usersArray[i]);
        usersData.push(userData);
    }
    return usersData;
}

const stockTransaction = async (id, stockPurchase) => {
    stockPurchase._id = new ObjectID();
    stockPurchase.date = todaysDate();
    await userCollection.updateOne({ _id: ObjectID(id) }, { $push: { shareTransactions: stockPurchase } });
    const updatedUser = await getUserData(id);
    return updatedUser;
}

const setUserCollection = (userColl) => {
    userCollection = userColl;
}

module.exports = { getUserData, getUsersData, setUserCollection, stockTransaction };