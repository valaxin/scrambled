'use strict'

import DisplayIncomingMessage from '/modules/display-message.js'
import DisplaySpotifySong from '/modules/display-song.js'

const stageElement = document.querySelector('div#stage')
const socket = io(window.location.origin)

socket.on('display-message', async (data) => {
  try {
    console.log('display-message init')
    await DisplayIncomingMessage(stageElement, data)
  } catch (ex) {
    console.error(ex)
  }
})

socket.on('display-song', async (data) => {
  try {
    console.log('display-song init')
    await DisplaySpotifySong(stageElement, data)
  } catch (ex) {
    console.error(ex)
  }
})

