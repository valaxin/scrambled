import { getYTVideoId } from '/modules/video-player.js'

'use strict'

const socket = io(window.location.origin)
const stage = document.querySelectorAll('div#stage')[0]

socket.on('event', async data => { window.location.reload() })
