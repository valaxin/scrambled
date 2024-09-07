'use strict'

import 'dotenv/config'
import { Router } from 'express'

import { getSpotifyAccessToken, getTwitchAccessToken } from './middleware/authenticate.js'

import getUserMessage from './middleware/message.js'

import { getSpotifyNowPlaying } from './middleware/spotify.js'
import {
  getTwitchBroadcastor,
  getTwitchAdSchedule,
  getTwitchChannelInfo,
  getTwitchChannelFollowers,
} from './middleware/twitch.js'

const router = Router()

const returnCreatorID = (req, res, next) => {
  res.json([req.twitch.creator.id])
}

router.post('/dom/message', getUserMessage)
router.post('/spotify/now', getSpotifyAccessToken, getSpotifyNowPlaying)
router.post('/twitch/creator', getTwitchAccessToken, getTwitchBroadcastor, returnCreatorID)
router.post('/twitch/creator/ads', getTwitchAccessToken, getTwitchBroadcastor, getTwitchAdSchedule)
router.post('/twitch/creator/channel', getTwitchAccessToken, getTwitchBroadcastor, getTwitchChannelInfo)
router.post('/twitch/creator/channel/followers', getTwitchAccessToken, getTwitchBroadcastor, getTwitchChannelFollowers)

export default router
