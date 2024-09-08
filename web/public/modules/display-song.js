'use strict'

export default async function DisplaySpotifySong(stage, data) {
  
  const existing = stage.querySelectorAll(`.nowplaying`)
  for (const div of existing) {
    div.remove()
  }
  
  const element = document.createElement(`div`)
  element.classList.add('nowplaying')
  const template = `
    <span class="title">${data.title}</span>
    <span class="artist">${data.artist}</span>
  `
  data.title === undefined ? element.innerHTML = '' : element.innerHTML = template.trim()
  stage.appendChild(element)
  
  if (data.timePlayed >= data.timeTotal / 3) {
    console.log('third of song has elapsed, hiding element')
    element.remove()
  }
}
