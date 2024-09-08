'use strict'

export default async function DisplayImage(stage, data) {
  const img = document.createElement(`img`)
  img.src = data.image
  stage.appendChild(img)
}
