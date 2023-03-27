
const getShareData = (shareTransactions, stockSymbol) => {
    const shareData = shareTransactions.reduce((shareTotals, trans) => {
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

const parseUserAssets = (shareTransactions, stockData) => {
    const parsedAssets = stockData.map((asset) => {
        const shareData = getShareData(shareTransactions, asset.symbol);
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

const parseUserData = (user, stockData) => {
    user.portfolio = parseUserAssets(user.shareTransactions, stockData);
    user.portfolioTotals = user.portfolio.reduce((totals, asset) => {
        totals.totalPortFolioValue += Number(asset.currentTotalValue);
        totals.totalPaid += Number(asset.totalPaid);
        totals.totalFromSales += Number(asset.totalFromSales);
        totals.totalValueIncrease += Number(asset.totalValueIncrease);
        return totals;
    }, { totalPortFolioValue: 0, totalPaid: 0, totalFromSales: 0, totalValueIncrease: 0 })
    Object.keys(user.portfolioTotals).map((key) => (
        user.portfolioTotals[key] = user.portfolioTotals[key].toFixed(2)
    ))
}

module.exports = { parseUserData };