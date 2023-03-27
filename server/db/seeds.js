use stockApp
db.dropDatabase();

db.userData.insertMany([
    {
        "name": "Millicent Moneybags",
        "portfolio": [
            {
                "stockSymbol": "AAPL",
                "numshares": 120,
                "averagePricePaid": 126,
                "currentMarketValue": 125,
                "currentTotalValue": 15120,
                "totalPaid": 15750,
                "totalFromSales": 0,
                "totalValueIncrease": -600
            },
            {
                "stockSymbol": "IBM",
                "numshares": 120,
                "averagePricePaid": 35,
                "currentMarketValue": 125,
                "currentTotalValue": 15000,
                "totalPaid": 4200,
                "totalfromSales": 0,
                "totalValueIncrease": 10800
            },
        ],

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
])

db.stocksCache.insertMany([{ "symbol": "AAPL", "name": "Apple Inc.", "cached": 20221025 }, { "symbol": "MSFT", "name": "Microsoft Corporation", "cached": 20221025 }, { "symbol": "IBM", "name": "International Business Machines Corporation", "cached": 20221025 }, { "symbol": "AMD", "name": "Advanced Micro Devices Inc.", "cached": 20221025 }, { "symbol": "NOW", "name": "ServiceNow Inc.", "cached": 20221025 }, { "symbol": "SQ", "name": "Square Inc.", "cached": 20221025 }, { "symbol": "FIS", "name": "Fidelity National Information Services Inc.", "cached": 20221025 }, { "symbol": "INTU", "name": "Intuit Inc.", "cached": 20221025 }, { "symbol": "UBER", "name": "Uber Technologies Inc.", "cached": 20221025 }, { "symbol": "SNOW", "name": "Snowflake Inc.", "cached": 20221025 }]);
