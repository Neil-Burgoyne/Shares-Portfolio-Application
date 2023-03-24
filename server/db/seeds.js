use stockApp;
db.dropDatabase();

db.userData.insertMany([
    {
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
])

