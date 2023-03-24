const fetch = require('cross-fetch');
const express = require("express")



const ObjectID = require("mongodb").ObjectID

const stockRouter = function () {
    const router = express.Router();
    const apiKey = process.env.API_KEY;
    router.get('/', (req, res) => {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&outputsize=full&apikey=${apiKey}`;

        fetch(url)  // NEW
            .then(jsonData => jsonData.json())
            .then(data => res.json(data));
    })

    // // Index Route
    // router.get('/', (req, res) => {
    //     collection
    //         .find()
    //         .toArray()
    //         .then((docs) => res.json(docs))
    //         .catch((err) => {
    //             console.error(err)
    //             res.status(500)
    //             res.json({ status: 500, error: err })
    //         })
    // })

    // // Show Route /api/userdata/:id
    // router.get('/:id', (req, res) => {
    //     const id = req.params.id
    //     collection
    //         .findOne({ _id: ObjectID(id) })
    //         .then((docs) => parseUserData(docs))
    //         .then((docs) => res.json(docs))
    //         .catch((err) => {
    //             console.error(err)
    //             res.status(500)
    //             res.json({ status: 500, error: err })
    //         })
    // })

    // // Create Route
    // router.post('/', (req, res) => {
    //     const newData = req.body
    //     collection
    //         .insertOne(newData)
    //         .then(() => collection.find().toArray())
    //         .then((docs) => res.json(docs))
    //         .catch((err) => {
    //             console.error(err)
    //             res.status(500)
    //             res.json({ status: 500, error: err })
    //         })
    // })

    // // Destroy Route
    // router.put('/:id', (req, res) => {
    //     const id = req.params.id
    //     const updatedData = req.body
    //     collection
    //         .updateOne(
    //             { _id: ObjectID(id) },
    //             { $set: updatedData }
    //         )
    //         .then(() => collection.find().toArray())
    //         .then((docs) => res.json(docs))
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500);
    //             res.json({ status: 500, error: err })
    //         })
    // })

    // // Update Route
    // router.delete('/:id', (req, res) => {
    //     const id = req.params.id
    //     collection
    //         .deleteOne({ _id: ObjectID(id) })
    //         .then(() => collection.find().toArray())
    //         .then((docs) => res.json(docs))
    //         .catch((err) => {
    //             console.error(err)
    //             res.status(500)
    //             res.json({ status: 500, error: err })
    //         })
    // })

    return router

}

module.exports = stockRouter;