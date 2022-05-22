const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const fullPath = path.join(__dirname, '.env')
require('dotenv').config({ path: fullPath })
const url = process.env.dbstring
const app = express()

try {
  mongoose.connect(url, { useNewUrlParser: true }).catch(e => {
    console.log('error   in db ', e.message)
  })
  const con = mongoose.connection
  con.on('open', () => { console.log('connected...') })
} catch (e) {
  console.log('error in connection', e.message)
}
app.use(express.json())
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST', 'PUT', 'DELETE'
  ],

  allowedHeaders: '*'
}

app.use(cors(corsOpts))
const accountRouter = require('./routes/accounts')
app.use('/data', accountRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log(`server listen to ${PORT}`) })
