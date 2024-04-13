const jsondb = require('../db/middleware.js')
const express = require('express')
const router = express.Router()

router.get('/create', jsondb.create, async (req, res, next) => {
  res.status(200)
  res.send('hello')
})

router.get('/read', async (req, res, next) => {

})

router.post('/', async (req, res, next) => {})

router.delete('/', async (req, res, next) => {})

module.exports = router