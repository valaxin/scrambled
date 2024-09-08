'use strict'

export default async function DisplayImage(stage, data) {

  const existing = stage.querySelectorAll('.branding-image')
  for (element of existing) {
    element.remove()
  }

  const img = document.createElement(`img`)
  img.classList.add('branding-image')
  img.classList.add('visible')
  img.src = data.image
  stage.appendChild(img)
}
