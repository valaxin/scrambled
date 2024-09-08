'use strict'

export default async function DisplayMarquee(stage, data) {
  const element = document.createElement('div')
  element.classList.add('marquee-message')
  const marqueeElement = document.querySelector('div.marquee')
  const span = `<span>${data.author} : ${data.message}</span>`
  marqueeElement.innerHTML += span
}
