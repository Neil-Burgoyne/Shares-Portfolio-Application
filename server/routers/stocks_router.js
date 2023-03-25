
const express = require("express")
const { getStockData, getStockSymbols } = require('../repositories/stocks_repository')


const ObjectID = require("mongodb").ObjectID

const stocksRouter = function (stocksCollection) {
    const router = express.Router();

    router.get('/stock/:symbol', async (req, res) => {
        const symbol = req.params.symbol;
        const data = await getStockData(stocksCollection, symbol);
        res.json(data);
    })

    router.get('/stocksymbols/', async (req, res) => {
        const data = await getStockSymbols(stocksCollection);
        res.json(data);
    })
    return router
}

module.exports = stocksRouter;