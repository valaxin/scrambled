'use strict'

import 'dotenv/config'
import app from '../app.js'

export default async function (req, res, next) {
  try {
    const data = {
      author: req.params.author,
      message: req.params.message,
    }
    app.io.emit('alert', data)
    res.send({ status: 200, alert: data })
  } catch (ex) {
    res.send(500)
  }
}
