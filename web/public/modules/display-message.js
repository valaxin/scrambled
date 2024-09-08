'use strict'

const isTypeNumber = (value, defined) => {
  if (typeof value === 'number') {
    return value
  } else {
    return defined
  }
}

const truncateString = (value, length, ellipses) => {
  if (value.length > length) {
    const str = value.substring(0, length).trim()
    return ellipses ? `${str}...` : str
  } else {
    return value
  }
}

export default async function DisplayIncomingMessage (stage, data) {
  try {
    const timeout = isTypeNumber(data.timeout)
    const message = truncateString(data.message, 128, true)
    const element = document.createElement(`div`)
    element.classList.add('message')
    element.classList.add('visible')
    element.innerHTML = `
      <span class="message-author">${data.author}</span>
      <span class="message-body">${message}</span>
    `
    stage.appendChild(element)
    setTimeout(() => {
      element.classList.add('animation-state-now') // ...
      // provide 5 more seconds for fade out animation?
      setTimeout(() => {
        // ... then remove?
        element.remove()
      }, 5000)
    }, timeout)
  } catch (ex) {
    console.error(ex)
  }
}
