'use strict'

import 'dotenv/config'

async function songRequest(token) {
  const location = 'http://localhost:3000/api/v1/spotify/now'
  try {
    const response = await fetch(location, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    const data = await response.json()
    return data
  } catch (ex) {
    console.error(ex)
  }
}

export default async function (rate) {
  try {
    setInterval(async () => {
      await songRequest(process.env.SCRAMBLED) // run every "rate"
    }, rate)
  } catch (ex) {
    console.error('[daemon - songd]', ex)
  }
}
