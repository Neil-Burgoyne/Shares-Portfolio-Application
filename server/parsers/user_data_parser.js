const getShareData = (shareTransactions, stockSymbol) => {
    const shareData = shareTransactions.reduce((shareTotals, trans) => {
        if (trans.stockSymbol === stockSymbol) {
            if (trans.type === "purchase") {
                shareTotals.numPurchased += trans.quantity;
                shareTotals.cost += (trans.quantity * trans.price)
            } else if (trans.type === "sale") {
                shareTotals.salesTotal += (trans.quantity * trans.price)
                shareTotals.numSold += trans.quantity;
            }
        }
        return shareTotals;
    }, { numPurchased: 0, cost: 0, salesTotal: 0, numSold: 0 })
    if (shareData.num === 0) shareData.averagePricePaid = 0;
    else shareData.averagePricePaid = shareData.cost / shareData.numPurchased;
    return shareData;
}

const parseUserAssets = (shareTransactions, stockData) => {
    const parsedAssets = stockData.map((asset) => {
        const shareData = getShareData(shareTransactions, asset.symbol);
        const numShares = shareData.numPurchased - shareData.numSold;
        const averagePricePaid = shareData.averagePricePaid;
        const currentTotalValue = numShares * asset.closingValue;
        const totalPaid = numShares * averagePricePaid;
        const totalFromSales = shareData.salesTotal;
        const totalValueIncrease = totalFromSales + currentTotalValue - totalPaid;

        const newAssetData = {
            symbol: asset.symbol,
            name: asset.name,
            currentMarketValue: asset.closingValue.toFixed(2),
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
        totals.totalPortfolioValue += Number(asset.currentTotalValue);
        totals.totalPaid += Number(asset.totalPaid);
        totals.totalFromSales += Number(asset.totalFromSales);
        totals.totalValueIncrease += Number(asset.totalValueIncrease);
        return totals;
    }, { totalPortfolioValue: 0, totalPaid: 0, totalFromSales: 0, totalValueIncrease: 0 })
    Object.keys(user.portfolioTotals).map((key) => (
        user.portfolioTotals[key] = user.portfolioTotals[key].toFixed(2)
    ))
}

module.exports = { parseUserData };