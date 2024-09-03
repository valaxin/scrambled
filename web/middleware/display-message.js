'use strict'

import 'dotenv/config'
import app from '../app.js'

// POST:/api/v1/display/message

/* accept json from endpoint and emit websocket event/json to client */

/*
  {
    author: string,         -required
    message: string,        -required
    timeout_ms: number,     -optional, default: 10000 (10 seconds)
    delay_ms: number,       -optional, default: 0
  }
*/

export default async function (req, res, next) {
  const event = { name: 'display-message' }
  const def = { timeout: 10000, delay: 0 }

  if (!req.body.author || !req.body.message) {
    console.error('missing author/message')
    res.sendStatus(400)
  }

  try {
    event.data = {
      author: decodeURI(req.body.author),
      message: decodeURI(req.body.message),
      timeout: req.body.timeout || def.timeout,
      delay: req.body.delay || def.delay,
      animation: ''
    }
    app.io.emit(event.name, event.data)
    res.send({
      emit: event,
      status: 200,
    })
  } catch (ex) {
    console.error(`[express] we've encounted an error!`, { req, ex })
    res.sendStatus(500)
  }
}
