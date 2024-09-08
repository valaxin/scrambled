'use strict'

import 'dotenv/config'
import app from '../app.js'

export async function incomingMessageReq (req, res, next) {
  
  const timeout = !req.body.timeout ? 10000 : parseInt(decodeURI(req.body.timeout))
  const delay = !req.body.delay ? 0 : decodeURI(req.body.delay)
  const name = 'display-message'

  if (!req.body.author || !req.body.message) {
    res.sendStatus(400)
  }

  try {
    const data = {
      delay,
      timeout,
      author: decodeURI(req.body.author),
      message: decodeURI(req.body.message),
    }
    app.io.emit(name, data)
    res.send(data)
  } catch (ex) {
    res.send(ex)
  }
}

export async function incomingImageReq (req, res, next) {

  const name = 'display-image'

  if (!req.body.author) {
    res.sendStatus(400)
  }

  try {
    const data = {
      author: decodeURI(req.body.author),
      image: decodeURI(req.body.image)
    }
    app.io.emit(name, data)
    res.send(data)
  } catch (ex) {
    res.send(ex)
  }
}

export async function incomingMarqueeReq (req, res, next) {
  const timeout = !req.body.timeout ? 10000 : parseInt(decodeURI(req.body.timeout))
  const delay = !req.body.delay ? 0 : decodeURI(req.body.delay)
  const name = 'display-marquee'

  if (!req.body.author || !req.body.message) {
    res.sendStatus(400)
  }

  try {
    const data = {
      author: decodeURI(req.body.author),
      message: decodeURI(req.body.message),
    }
    app.io.emit(name, data)
    res.send(data)
  } catch (ex) {
    res.send(ex)
  }
}