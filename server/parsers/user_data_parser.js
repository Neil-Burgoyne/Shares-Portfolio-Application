const { getUniqueValues } = require("../utilities/array_utilities");


const getNumSharesSymbol = (data, stockSymbol) => {
    // console.log("getnumshares", data)
    return data.shareTransactions.reduce((total, trans) => {
        if (trans.stockSymbol === stockSymbol) {
            console.log(trans)
            if (trans.type === "purchase") {
                console.log("purchase")
                return total += trans.quantity;
            } else {
                return total -= trans.quantity;
            }
        } else {
            console.log("not purchase")
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
    if (numAndCost.num === 0) return 0;
    else return numAndCost.cost / numAndCost.num
}

const parseUserAssets = (rawData, stockData) => {
    const parsedAssets = stockData.map((asset) => {
        console.log(asset)
        newAssetData = { symbol: asset.symbol, name: asset.name, currentMarketValue: asset.closingValue };
        newAssetData.numShares = getNumSharesSymbol(rawData, asset.symbol)
        newAssetData.averagePricePaid = getAveragePriceSymbol(rawData, asset.symbol)

        return newAssetData;
    })
    return parsedAssets;
}

// const parseUsersData = (rawUsersData) => {
//     return rawUsersData.map((rawUserData) => parseUserData(rawUserData));
// }

module.exports = { parseUserAssets };