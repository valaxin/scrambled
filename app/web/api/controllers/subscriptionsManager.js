const database = require('../middleware/subscriptionsMiddleware.js')
const express = require('express')
const router = express.Router()

// this file defines the endpoing for which data is recived

router.post('/create', database.registerNewFeed, async (req, res, next) => {
  res.json(req.body)
})

module.exports = router