'use strict'

import 'dotenv/config'
import { Router } from 'express'
import { getSpotifyAccessToken, getTwitchAccessToken } from './middleware/authenticate.js'
import { incomingImageReq, incomingMessageReq, incomingMarqueeReq } from './middleware/events.js'
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

router.post('/spotify/now', getSpotifyAccessToken, getSpotifyNowPlaying)

router.post('/dom/image', incomingImageReq)
router.post('/dom/marquee', incomingMarqueeReq)
router.post('/dom/message', incomingMessageReq)

router.post('/twitch/ads', getTwitchAccessToken, getTwitchBroadcastor, getTwitchAdSchedule)
router.post('/twitch/creator', getTwitchAccessToken, getTwitchBroadcastor, returnCreatorID)
router.post('/twitch/channel', getTwitchAccessToken, getTwitchBroadcastor, getTwitchChannelInfo)
router.post('/twitch/followers', getTwitchAccessToken, getTwitchBroadcastor, getTwitchChannelFollowers)

export default router
