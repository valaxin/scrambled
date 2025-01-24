'use strict'

const message = 'hello world!'

function getStageElement() {
  let stage = document.getElementById('stage')
  if (stage === null) {
    stage = document.createElement('div')
    stage.id = 'stage'
    stage.dataset.state = 'uninitilized'
    stage.dataset.last = null
    stage.dataset.next = null
    document.body.appendChild(stage)
  }
  return stage
}

const stage = getStageElement() // find or make #stage
const socket = io(window.location.origin) // connect

console.log(stage, socket)

/* -- Socket Event Functions -- */

socket.on('spotify-ping', (data) => {
  
  let songElement = document.createElement('span')
  songElement.innerText = `${data.song.title} -- ${data.song.artist}`
  songElement.classList.add('song')
  stage.dataset.state = 'playing'
  
  if (data.visible === false) {
    songElement.style.display = 'none'
  }

  let existingElement = stage.querySelector('.song')
  if (existingElement !== null) {
    existingElement.remove()
  }
    
  stage.appendChild(song)
})