const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const usersRouter = require('./routers/users_router.js')
const stocksRouter = require('./routers/stocks_router.js')
const { setStocksCache } = require('./repositories/stocks_repository')
const cors = require('cors')
const { setUserCollection } = require('./repositories/users_repository.js')

const dotenv = require('dotenv').config();


app.use(cors())
app.use(express.json())

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
  .then((client) => {

    const db = client.db('stockApp'); // Add database name
    const userCollection = db.collection('userData');
    setUserCollection(userCollection);
    const stocksCollection = db.collection('stocksCache') // Add name
    setStocksCache(stocksCollection);
    const userRouter = usersRouter(userCollection) // Add name
    const stockRouter = stocksRouter();
    app.use('/api/users', userRouter) // Add name
    app.use('/api/stocks', stockRouter) // Add name
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