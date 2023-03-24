const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
  .then((client) => {

    // const db = client.db('') // Add database name

    // const ""Collection = db.collection('') // Add name

    // const ""Router = createRouter(""Collection) // Add name

    // app.use('/api/', ""Router) // Add name
  })
  .catch(console.err)

app.listen(9000, function () {
  console.log(`Listening on port ${ this.address().port }`)
})
