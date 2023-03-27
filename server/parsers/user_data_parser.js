const { getUniqueValues } = require("../utilities/array_utilities");


const getNumSharesSymbol = (data, stockSymbol) => {
    return num = data.shareTransactions.reduce((total, trans) => {
        if (trans.stockSymbol === stockSymbol) {
            if (trans.type === "purchase") {
                return total += trans.quantity;
            } else {
                return total -= trans.quantity;
            }
        } else {
            return total;
        }
    }, 0)
}

const getAveragePriceSymbol = (data, stockSymbol) => {
    const numAndCost = data.shareTransactions.reduce((shareTotals, trans) => {
        if (trans.stockSymbol === stockSymbol) {
            if (trans.type === "purchase") {
                shareTotals.num += trans.quantity;
                shareTotals.cost += (trans.quantity * trans.price)
            }
        }
        return shareTotals;
    }, { num: 0, cost: 0 })
    console.log(numAndCost);
    if (numAndCost.num === 0) return 0;
    else return numAndCost.cost / numAndCost.num
}

const parseUserData = (rawData) => {
    const parsedData = {};
    parsedData.name = rawData.name;
    parsedData._id = rawData._id;
    console.log("parseUser", rawData.shareTransactions)

    const stockSymbols = getUniqueValues(rawData.shareTransactions, "stockSymbol");
    console.log(stockSymbols)
    const parsedShares = stockSymbols.map((symbol) => {
        const newShareValue = { name: symbol }
        newShareValue.numShares = getNumSharesSymbol(rawData, symbol)
        newShareValue.averagePricePaid = getAveragePriceSymbol(rawData, symbol)
        newShareValue.currentMarketValue = 100
        return newShareValue;
    })
    parsedData.shareValues = parsedShares;
    return parsedData;
}

const parseUsersData = (rawUsersData) => {
    return rawUsersData.map((rawUserData) => parseUserData(rawUserData));
}

module.exports = { parseUserData, parseUsersData };