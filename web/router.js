'use strict'

import 'dotenv/config'
import { Router } from 'express'

import getNowPlaying from './middleware/spotify-nowplaying.js'
import getAccessToken from './middleware/spotify-access.js'
import getUserMessage from './middleware/user-message.js'

const router = Router()

router.post('/display/song', getAccessToken, getNowPlaying)
router.post('/display/message', getUserMessage)

/*
router.post('/stage/clear', token, worker.stageClear)

router.post('/display/song', token, render.songInfomation)
router.post('/display/game', token, render.videogameInformation)
router.post('/display/message', token, render.discordUserMessage)

router.post('/alert/:author/:message', tokenCheck, alertMessage)

router.post('/now-playing', tokenCheck, getSpotifyAccessToken, nowPlaying)
*/

export default router

