'use strict'

import 'dotenv/config'

async function marqueeText(token) {
  const location = 'http://localhost:3000/api/v1/dom/marquee'
  try {
    const response = await fetch(location, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        author: 'owner',
        message: 'welcome to my stream! this is a marquee message, it should scroll across the top to bottom of the screen. -enjoy!'
      }),
    })
    const data = await response.json()
    return data
  } catch (ex) {
    console.error(ex)
  }
}

export default async function (rate) {
  try {
    await marqueeText(process.env.SCRAMBLED) // run once...
    setInterval(async () => {
      await marqueeText(process.env.SCRAMBLED) // then every "rate"
    }, rate)
  } catch (ex) {
    console.error('[daemon]', ex)
  }
}
