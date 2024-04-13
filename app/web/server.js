const config = require('./config.json')
const crypto = require('node:crypto')
const logger = require('morgan')('dev')
const express = require('express')
const bodyParser = require('body-parser')

const subscriptionManager = require('./api/subscriptionManager.js')

const app = express()

app.set('port', config.post || '3000')
app.set('host', config.host || '0.0.0.0')

app.use(bodyParser.json({
    verify: (req, res, buf) => {
        // Small modification to the JSON bodyParser
        // to expose the raw body in the request object
        // The raw body is required at signature verification
        req.rawBody = buf
    }
}))

app.use(logger)

app.use('/api/sm/', subscriptionManager)

app.listen(app.locals.settings.port, () => {
  console.log(`http://localhost:${app.locals.settings.port}`)
})
