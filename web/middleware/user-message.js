'use strict'

import 'dotenv/config'
import app from '../app.js'

export default async function (req, res, next) {
  const event = 'display-message'
  try {
    const data = {
      author: req.body.author,
      message: req.body.message,
      timeout: req.body.timeout || 15000,
    }
    app.io.emit(event, data)
    res.send({ emit: event, status: 200, data })
  } catch (ex) {
    console.error(`[express] ".../middleware/user-message.js" has encounted an error`, req, ex)
    res.sendStatus(500)
  }
}
