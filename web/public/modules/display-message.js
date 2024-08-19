'use strict'

const sanitize_timeout = (value) => {
  if (typeof value === 'number') {
    return value
  } else {
    return 15000
  }
}

const shorten_message = (value, length) => {
  if (value.length > length) {
    return value.substring(0, length) + '...'
  } else {
    return value
  }
}

export default async function DisplayMessage(stage, data, selector) {
  try {
    const charLimit = 128
    const timeout = sanitize_timeout(data.timeout)
    const template = document.createElement(`div`)
    template.classList.add(selector)
    template.innerHTML = `
      <div class="${selector}-container">
        <div class="pie-timer">
          <div class="pie spinner"></div>
          <div class="pie filler"></div>
          <div class="mask"></div>
        </div>
        <div class="user-${selector}">
          <span class="${selector}-author">${data.author}</span>
          <span class="${selector}-body">${decodeURI(shorten_message(data.message, charLimit))}</span>
        </div>
      </div>
    `
    stage.appendChild(template)
    setTimeout(() => {
      template.remove()
      console.log(`removed message element by: "${data.author}" from the stage after "${timeout}" milliseconds.`)
    }, timeout)
  } catch (ex) {
    console.error('an excepection displaying incoming messages has occured', ex)
  }
}
