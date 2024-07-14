'use strict'

export default async function displayAlert(stage, data) {
  const template = `
    <div class="alert">
      <span class="alert-author">${data.author}</span>
      <span class="alert-message">${data.message}</span>
      <span class="alert-date"></span>
    </div>
  `
  stage.innerHTML += template
  const alertElement = stage.querySelectorAll('div.alert')[0]
  setTimeout(() => {
    alertElement.remove()
  }, 5000) // 5 seconds
}
