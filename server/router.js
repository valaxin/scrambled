'use strict'

import 'dotenv/config'
import { Router } from 'express'
import { getSpotifyAccessToken, getTwitchAccessToken } from './controllers/tokens.js'
import { getBroadcastor, getAdSchedule, getChannelInfo, getFollowers } from './controllers/twitch.js'
import nowPlaying from './controllers/spotify.js'
import {
  createAndSaveNewMessage,
  getAllMessages,
  deleteMessageById,
  deleteAllMessagesByAuthor,
  getAllMessagesByAuthor,
  getMessageById,
} from './controllers/database.js'

const router = Router()

// [OK!]
router.get('/spotify', getSpotifyAccessToken, nowPlaying)

// [OK!]
router.get('/twitch', getTwitchAccessToken, getBroadcastor, getChannelInfo)
router.get('/twitch/ads', getTwitchAccessToken, getBroadcastor, getAdSchedule)
router.get('/twitch/followers', getTwitchAccessToken, getBroadcastor, getFollowers)

// [OK!]
router.post('/message', createAndSaveNewMessage)

router.get('/messages', getAllMessages)
router.get('/message/:id', getMessageById)
router.get('/messages/:author', getAllMessagesByAuthor)

router.delete('/message/:id', deleteMessageById)
router.delete('/messages/:author', deleteAllMessagesByAuthor)

export default router
