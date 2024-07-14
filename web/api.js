'use strict'

import 'dotenv/config'
import { Router } from 'express'

import getSpotifyAccessToken from './middleware/spotify-access.js'
import alertMessage from './middleware/message-alert.js'
import nowPlaying from './middleware/now-playing.js'

async function tokenCheck(request, response, next) {
  try {
    if ('access_token' in request.body) {
      if (request.body.access_token === process.env.INT_TOKEN) {
        request.body.access_token = true
        console.log(`[express] token check passed`)
        next()
      } else {
        response.send(401)
      }
    } else {
      response.send(403)
    }
  } catch (ex) {
    console.error('[express] invalid app token, unable to proceed', ex)
    response.send(500)
  }
}

const router = Router()

router.post('/alert/:author/:message', tokenCheck, alertMessage)
router.post('/now-playing', tokenCheck, getSpotifyAccessToken, nowPlaying)
// router.post('/is-live/:streamer')

export default router
