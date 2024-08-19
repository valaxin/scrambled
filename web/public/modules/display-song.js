'use strict'

export default async function displaySong(stage, data, selector) {
  const existing = stage.querySelectorAll(`.${selector}`)
  const template = document.createElement(`div`)

  for (const div of existing) {
    div.remove()
  }

  template.classList.add(selector)

  if (data.title === undefined) {
    template.innerHTML = ``
  } else {
    template.innerHTML = `
      <div class="${selector}-container">
        <span class="${selector}-title">${data.title}</span>
        <span class="${selector}-artist">${data.artist}</span>
        <span class="${selector}-album">${data.album}</span>
      </div>
    `
  }

  let rate = 1000
  let wait = 30
  let time = data.timePlayed
  const elapsed = setInterval(() => {
    console.log(`displaying data for ${rate} x ${wait} ms`)
    time += rate
    if (time > data.timePlayed + rate * wait) {
      console.log('hiding...')
      clearInterval(elapsed)
      template.remove()
    }
  }, rate)
  
  stage.appendChild(template)
  
  if (data.force !== true) {
    console.log('no force flag')
    if (data.timePlayed >= data.timeTotal / 3) {
      console.log('song is already beyond allowable display time, please provide force flag')
      template.remove()
    }
  }

}
