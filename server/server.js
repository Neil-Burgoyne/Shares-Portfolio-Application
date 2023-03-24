const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
  .then((client) => {

    const db = client.db('stockApp') // Add database name
    const userCollection = db.collection('userData') // Add name
    const userRouter = createRouter(userCollection) // Add name

    app.use('/api/userdata', userRouter) // Add name
  })
  .catch(console.err)

app.listen(9000, function () {
  console.log(`Listening on port ${this.address().port}`)
})
