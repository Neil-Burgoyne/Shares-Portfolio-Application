
const getShareData = (data, stockSymbol) => {
    const shareData = data.shareTransactions.reduce((shareTotals, trans) => {
        if (trans.stockSymbol === stockSymbol) {
            if (trans.type === "purchase") {
                shareTotals.num += trans.quantity;
                shareTotals.cost += (trans.quantity * trans.price)
            } else if (trans.type === "sale") {
                shareTotals.salesTotal += (trans.quantity * trans.price)
            }
        }
        return shareTotals;
    }, { num: 0, cost: 0, salesTotal: 0 })
    if (shareData.num === 0) shareData.averagePricePaid = 0;
    else shareData.averagePricePaid = shareData.cost / shareData.num;
    return shareData;
}

const parseUserAssets = (rawData, stockData) => {
    const parsedAssets = stockData.map((asset) => {
        const shareData = getShareData(rawData, asset.symbol);
        const numShares = shareData.num;
        const averagePricePaid = shareData.averagePricePaid;
        const currentTotalValue = numShares * asset.closingValue;
        const totalPaid = numShares * averagePricePaid;
        const totalFromSales = shareData.salesTotal;
        const totalValueIncrease = totalFromSales + currentTotalValue - totalPaid;

        const newAssetData = {
            symbol: asset.symbol,
            name: asset.name,
            currentMarketValue: asset.closingValue,
            numShares,
            averagePricePaid: averagePricePaid.toFixed(2),
            currentTotalValue: currentTotalValue.toFixed(2),
            totalPaid: totalPaid.toFixed(2),
            totalFromSales: totalFromSales.toFixed(2),
            totalValueIncrease: totalValueIncrease.toFixed(2)
        };
        return newAssetData;
    })
    return parsedAssets;
}



module.exports = { parseUserAssets };