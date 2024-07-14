'use strict'

import displayAlert from '/modules/display-alert.js'
// import { getYTVideoId } from '/modules/video-player.js'

const socket = io(window.location.origin)
const stage = document.querySelectorAll('div#stage')[0]

socket.on('alert', async (data) => {
  displayAlert(stage, data)
})
socket.on('now-playing', async (data) => {
  console.log(stage, data)
})
