const dummyData = {
    "name": "Millicent Moneybags",
    "shareTransactions": [
        {
            "stockSymbol": "AAPL",
            "quantity": 15,
            "date": "22-10-12",
            "price": 120.00,
            "type": "purchase"
        },
        {
            "stockSymbol": "AAPL",
            "quantity": 100,
            "date": "21-10-12",
            "price": 114.00,
            "type": "purchase"
        },
        {
            "stockSymbol": "AAPL",
            "quantity": 17,
            "date": "22-10-09",
            "price": 105.00,
            "type": "purchase"
        },
        {
            "stockSymbol": "AAPL",
            "quantity": 18,
            "date": "22-11-12",
            "price": 127.00,
            "type": "purchase"
        },
        {
            "stockSymbol": "IBM",
            "quantity": 18,
            "date": "22-11-12",
            "price": 127.00,
            "type": "purchase"
        }

    ]
}

const getUniqueStockSymbols = (data) => {
    return data.shareTransactions.reduce((uniqueSymbols, element) => {
        if (!uniqueSymbols.includes(element.stockSymbol)) {
            uniqueSymbols.push(element.stockSymbol)
        }
        return uniqueSymbols;
    }, []
    )
}
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
    const stockSymbols = getUniqueStockSymbols(rawData);
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

module.exports = parseUserData;