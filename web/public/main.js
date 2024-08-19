'use strict'

import displayMessage from '/modules/display-message.js'
import displaySong from './modules/display-song.js'

const socket = io(window.location.origin)
const stage = document.querySelectorAll('div#stage')[0]

socket.on('display-song', async (data) => {
  try {
    displaySong(stage, data, 'song')
  } catch (ex) {
    console.error(ex)
  }
})

socket.on('display-message', async (data) => {
  try {
    displayMessage(stage, data, 'message')
  } catch (ex) {
    console.error(ex)
  }
})
