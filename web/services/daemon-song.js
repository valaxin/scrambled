'use strict'

import 'dotenv/config'

async function songRequest(token) {
  const location = 'http://localhost:3000/api/v1/display/song'
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
  setInterval(async () => {
    try {
      const song = await songRequest(process.env.SCRAMBLED)
    } catch (ex) {
      console.error('[daemon] unable to get song data', ex)
    }
  }, rate)
}


