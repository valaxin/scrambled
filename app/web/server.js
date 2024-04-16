
const crypto = require('node:crypto')
const logger = require('morgan')('dev')
const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config.json')
const manager = require('./api/controllers/subscriptionsManager.js')

const app = express()

app.set('port', config.post)
app.set('host', config.host)

app.use(bodyParser.json())
app.use(logger)
app.use('/api/subscriptions', manager)

app.listen(config.port, config.host, () => {
  console.log(`[jimbo/express] Now Listening \n http://${config.host}:${config.port}/`)
})

module.exports = app