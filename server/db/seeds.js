use stockApp
db.dropDatabase();

db.userData.insertMany([
    {
        "name": "James Smith",
        "portfolio": [

        ],

        "shareTransactions": [
            {
                "stockSymbol": "AAPL",
                "quantity": 15,
                "date": "22-10-12",
                "price": "120.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "AAPL",
                "quantity": 100,
                "date": "21-10-12",
                "price": "114.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "AAPL",
                "quantity": 17,
                "date": "22-10-09",
                "price": "105.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "AAPL",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "IBM",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "IBM",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "IBM",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "IBM",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "U",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "U",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "U",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "AMD",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "AMD",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "AMD",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "AMD",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "UBER",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "UBER",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "UBER",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            },
            {
                "stockSymbol": "UBER",
                "quantity": 18,
                "date": "22-11-12",
                "price": "127.00",
                "type": "purchase"
            }

        ]
    }
])

db.stocksCache.insertMany([
    { "symbol": "AAPL", "name": "Apple Inc.", "cached": 20221025 },
    { "symbol": "MSFT", "name": "Microsoft Corporation", "cached": 20221025 },
    { "symbol": "IBM", "name": "International Business Machines Corporation", "cached": 20221025 },
    { "symbol": "AMD", "name": "Advanced Micro Devices Inc.", "cached": 20221025 },
    { "symbol": "NOW", "name": "ServiceNow Inc.", "cached": 20221025 },
    { "symbol": "SQ", "name": "Square Inc.", "cached": 20221025 },
    { "symbol": "FIS", "name": "Fidelity National Information Services Inc.", "cached": 20221025 },
    { "symbol": "INTU", "name": "Intuit Inc.", "cached": 20221025 },
    { "symbol": "UBER", "name": "Uber Technologies Inc.", "cached": 20221025 },
    { "symbol": "SNOW", "name": "Snowflake Inc.", "cached": 20221025 },
    { "symbol": "FISV", "name": "Fiserv Inc.", "cached": 20221025 },
    { "symbol": "AMAT", "name": "Applied Materials Inc.", "cached": 20221025 },
    { "symbol": "MU", "name": "Micron Technology Inc.", "cached": 20221025 },
    { "symbol": "INFY", "name": "Infosys Limited", "cached": 20221025 },
    { "symbol": "LRCX", "name": "Lam Research Corporation", "cached": 20221025 },
    { "symbol": "VMW", "name": "VMware Inc.", "cached": 20221025 },
    { "symbol": "ADSK", "name": "Autodesk Inc.", "cached": 20221025 },
    { "symbol": "TEAM", "name": "Atlassian Corporation Plc", "cached": 20221025 },
    { "symbol": "DELL", "name": "Dell Technologies Inc.", "cached": 20221025 },
    { "symbol": "ADI", "name": "Analog Devices Inc.", "cached": 20221025 },
    { "symbol": "WDAY", "name": "Workday Inc.", "cached": 20221025 },
    { "symbol": "NXPI", "name": "NXP Semiconductors N.V.", "cached": 20221025 },
    { "symbol": "CTSH", "name": "Cognizant Technology Solutions Corporation", "cached": 20221025 },
    { "symbol": "ERIC", "name": "Telefonaktiebolaget LM Ericsson (publ)", "cached": 20221025 },
    { "symbol": "DOCU", "name": "DocuSign Inc.", "cached": 20221025 },
    { "symbol": "PLTR", "name": "Palantir Technologies Inc.", "cached": 20221025 },
    { "symbol": "KLAC", "name": "KLA Corporation", "cached": 20221025 },
    { "symbol": "APH", "name": "Amphenol Corporation", "cached": 20221025 },
    { "symbol": "TEL", "name": "TE Connectivity Ltd.", "cached": 20221025 },
    { "symbol": "U", "name": "Unity Software Inc.", "cached": 20221025 },
]);
