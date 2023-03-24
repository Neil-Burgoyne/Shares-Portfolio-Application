const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./routers/create_router.js')
const stockRouter = require('./routers/stocks_router.js')
const cors = require('cors')

const dotenv = require('dotenv').config();


app.use(cors())
app.use(express.json())

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
  .then((client) => {

    const db = client.db('stockApp') // Add database name
    const userCollection = db.collection('userData') // Add name
    const userRouter = createRouter(userCollection) // Add name
    const stocksRouter = stockRouter();
    app.use('/api/userdata', userRouter) // Add name
    app.use('/api/stockdata', stocksRouter) // Add name
  })
  .catch(console.err)

app.listen(9000, function () {
  console.log(`Listening on port ${this.address().port}`)
})

// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// const databaseURL = process.env.DATABASE_URL;
// MongoClient.connect(databaseURL)
//   .then(/* ... */);