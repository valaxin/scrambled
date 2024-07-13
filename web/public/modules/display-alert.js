'use strict'

export default async function displayAlert(stage, data) {
  console.log(stage, data)
  
  const alertElement = document.createElement('div')
  alertElement.classList.add('alert')
  alertElement.innerText = `${data.author} :: ${data.message}`
  stage.appendChild(alertElement)

  setTimeout(() => {
    alertElement.remove()
  }, 4500)
}

