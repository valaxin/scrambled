'use strict'

import 'dotenv/config'
import { Router } from 'express'

import getNowPlaying from './middleware/spotify-nowplaying.js'
import getAccessToken from './middleware/spotify-access.js'
import getUserMessage from './middleware/user-message.js'

const router = Router()

router.post('/display/song', getAccessToken, getNowPlaying)
router.post('/display/message', getUserMessage)

export default router

