'use strict'

import 'dotenv/config'
import { Router } from 'express'
import { getSpotifyAccessToken, getTwitchAccessToken } from './controllers/tokens.js'
import { getBroadcastor, getAdSchedule, getChannelInfo, getFollowers } from './controllers/twitch.js'
import nowPlaying from './controllers/spotify.js'

import messages from './controllers/database/message.js'

import { createAndSaveUniqueRequest, getRequestQueue } from './controllers/database/request.js'
import { delayedEmit } from './controllers/support.js'

const router = Router()

// [OK!]

try {

// [OK!]
router.get('/spotify', getSpotifyAccessToken, nowPlaying)

// [OK!]
router.get('/twitch', getTwitchAccessToken, getBroadcastor, getChannelInfo)
router.get('/twitch/ads', getTwitchAccessToken, getBroadcastor, getAdSchedule)
router.get('/twitch/followers', getTwitchAccessToken, getBroadcastor, getFollowers)
 
// [OK!]
router.get('/messages', messages.getAll)
router.get('/message/:id', messages.getOneById)
router.get('/messages/:author', messages.getAllByAuthor)
router.post('/message', messages.createAndSaveNew)
router.delete('/message/:id', messages.deleteById)
router.delete('/messages/:author', messages.deleteAllByAuthor)

} catch (error) {
  console.log('routererror', error)
}

// [DO!]
router.post('/request', createAndSaveUniqueRequest, delayedEmit)
router.get('/requests', getRequestQueue)
// router.delete('/request/:id', deleteRequestById)

// [DO!]
// Intergrate ATProtocol, Ability to read a feed/inbox for posts > parsed for acceptable display

export default router
