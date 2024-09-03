'use strict'

import 'dotenv/config'
import { Router } from 'express'

import getSpotifyNowPlaying from './middleware/spotify-nowplaying.js'
import getSpotifyAccessToken from './middleware/spotify-access.js'
import getUserMessage from './middleware/display-message.js'
import getUserElement from './middleware/display-element.js'

import getTwitchAccessToken from './middleware/twitch-access.js'
import {
  getTwitchBroadcastor,
  getTwitchAdSchedule,
  getTwitchChannelInfo,
  getTwitchChannelFollowers,
} from './middleware/twitch-interactions.js'

const router = Router()

router.post('/display/message', getUserMessage)
router.post('/display/element', getUserElement)

router.post('/spotify/now', getSpotifyAccessToken, getSpotifyNowPlaying)

router.post('/twitch/creator', getTwitchAccessToken, getTwitchBroadcastor, (req, res, next) => { res.json([req.twitch.creator.id]) })
router.post('/twitch/creator/ads', getTwitchAccessToken, getTwitchBroadcastor, getTwitchAdSchedule)
router.post('/twitch/creator/channel', getTwitchAccessToken, getTwitchBroadcastor, getTwitchChannelInfo)
router.post('/twitch/creator/channel/followers', getTwitchAccessToken, getTwitchBroadcastor, getTwitchChannelFollowers)

// router.post('/media/query', )

export default router
