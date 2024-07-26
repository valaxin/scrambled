'use strict'

export default async function displaySong(stage, data, selector) {
  
  const existing = stage.querySelectorAll(`.${selector}`)
  const template = document.createElement(`div`)
  
  for (const div of existing) { div.remove() }
  
  template.classList.add(selector)

  if (data.title === undefined) {
    template.innerHTML = `
      <span class="${selector}-title animated-text wave">spotify isn't playing</span>
    `
  } else {
    template.innerHTML = `
      <span class="${selector}-title animated-text wave">${data.title}</span>
      <span class="${selector}-artist animated-text wave">${data.artist}</span>
      <span class="${selector}-album animated-text wave">${data.album}</span>
    `
  }
  stage.appendChild(template)

  if (data.timePlayed >= data.timeTotal / 3) {
    template.remove()
  }
}
