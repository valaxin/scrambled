'use strict'

import 'dotenv/config'
import app from '../app.js'

export default async function (req, res, next) {
  const event = { name: 'display-message' }
  const def = { timeout: 0, delay: 0 }

  if (!req.body.author || !req.body.image) {
    console.error('missing author/image')
    res.sendStatus(400)
  }

  try {
    event.data = {
      author: decodeURI(req.body.author),
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
