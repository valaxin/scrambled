'use strict'

export default async function DisplayMarquee(stage, data) {
  const element = document.createElement(`div`)
  element.classList.add('marquee')
  const template = `<span>${data.author} : ${data.message}</span>`
  element.innerHTML = template
  stage.appendChild(element)
}
