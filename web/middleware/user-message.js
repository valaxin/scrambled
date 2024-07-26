'use strict'

import 'dotenv/config'
import app from '../app.js'

export default async function (req, res, next) {
  try {
    const data = {
      author: req.body.author,
      message: req.body.message,
      timeout: req.body.timeout || 15000
    }
    app.io.emit('display-message', data)
    res.send({ emit: 'ws://display-message', status: 200,  data })
  } catch (ex) {
    console.error('unable to process incoming request', req, ex)
    res.send(500)
  }
}
