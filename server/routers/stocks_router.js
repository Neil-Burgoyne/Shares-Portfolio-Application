const express = require("express")
const { getStockData, getStocksData, getNews } = require('../repositories/stocks_repository')

const ObjectID = require("mongodb").ObjectID

const stocksRouter = function () {
    const router = express.Router();

    router.get('/news/', async (req, res) => {
        try {
            const symbol = req.params.symbol;
            const data = await getNews();
            res.json(data);
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({ status: 500, error: err })
        }
    })

    router.get('/news/:symbol', async (req, res) => {
        try {
            const symbol = req.params.symbol;
            const data = await getNews(symbol);
            res.json(data);
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({ status: 500, error: err })
        }
    })

    router.get('/', async (req, res) => {
        try {
            const data = await getStocksData();
            res.json(data);
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({ status: 500, error: err })
        }
    })

    router.get('/:symbol', async (req, res) => {
        try {
            const symbol = req.params.symbol;
            const data = await getStockData(symbol);
            res.json(data);
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({ status: 500, error: err })
        }
    })

    return router
}

module.exports = stocksRouter;