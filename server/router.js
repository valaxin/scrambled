'use strict'

import 'dotenv/config'
import { Router } from 'express'
import { getSpotifyAccessToken, getTwitchAccessToken } from './middleware/tokens.js'
import { getBroadcastor, getAdSchedule, getChannelInfo, getFollowers } from './middleware/twitch.js'
import nowPlaying from './middleware/spotify.js'

const router = Router()

// [OK!]
router.get('/spotify',
  getSpotifyAccessToken,
  nowPlaying
)

// [DO!]
router.get('/twitch',
  getTwitchAccessToken,
  getBroadcastor,
  getChannelInfo
)

// [DO!]
router.get('/twitch/ads',
  getTwitchAccessToken,
  getBroadcastor,
  getAdSchedule
)

// [DO!]
router.get('/twitch/followers',
  getTwitchAccessToken,
  getBroadcastor,
  getFollowers
)

export default router
