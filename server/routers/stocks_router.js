
const express = require("express")
const { getStockData, getStocksData, getStockSymbols } = require('../repositories/stocks_repository')


const ObjectID = require("mongodb").ObjectID

const stocksRouter = function (stocksCollection) {
    const router = express.Router();

    router.get('/', async (req, res) => {

        const data = await getStocksData(stocksCollection);
        res.json(data);
    })
    router.get('/:symbol', async (req, res) => {
        const symbol = req.params.symbol;
        const data = await getStockData(stocksCollection, symbol);
        res.json(data);
    })

    return router
}

module.exports = stocksRouter;