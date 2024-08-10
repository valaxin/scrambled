'use strict'

import displayMessage from '/modules/display-message.js'
import displaySong from './modules/display-song.js'

console.log('starting...')

const socket = io(window.location.origin)
const stage = document.querySelectorAll('div#stage')[0]

const animateText = () => {
  const animatedText = document.querySelectorAll('.animated-text')

  function animate(element) {
    const textArray = element.innerText.split('')
    element.firstChild.remove()

    const elArray = textArray.map((letter, index) => {
      if (letter == ' ') letter = '&nbsp;'
      var el = document.createElement('span')
      el.className = 'letter'
      el.innerHTML = letter
      el.style.animationDelay = index / textArray.length + 's'
      element.appendChild(el)
      return el
    })
    element.innerHtml = elArray
  }

  animate(animatedText)
}

socket.on('display-song', async (data) => {
  displaySong(stage, data, 'song')
})

socket.on('display-message', async (data) => {
  displayMessage(stage, data, 'message')
})
