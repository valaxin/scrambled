'use strict'

import DisplayImage from '/modules/display-image.js'
import DisplayIncomingMessage from '/modules/display-message.js'
import DisplayMarquee from '/modules/display-marquee.js'
import DisplaySpotifySong from '/modules/display-song.js'

const stageElement = document.querySelector('div#stage')
const socket = io(window.location.origin)

socket.on('scrambled-reload', async (data) => {
  try {
    console.log('reloading')
    window.location.reload()
  } catch(ex) {
    console.error(ex)
  }
})

socket.on('display-message', async (data) => {
  try {
    console.log('display-message')
    await DisplayIncomingMessage(stageElement, data)
  } catch (ex) {
    console.error(ex)
  }
})

socket.on('display-song', async (data) => {
  try {
    console.log('display-song')
    await DisplaySpotifySong(stageElement, data)
  } catch (ex) {
    console.error(ex)
  }
})

socket.on('display-image', async (data) => {
  try {
    console.log('display-image')
    await DisplayImage(stageElement, data)
  } catch (ex) {
    console.error(ex)
  }
})

socket.on('display-marquee', async (data) => {
  try {
    console.log('display-marquee')
    await DisplayMarquee(stageElement, data)
  } catch (ex) {
    console.error(ex)
  }
})

