'use strict'

import 'dotenv/config'

async function imageRequest(token) {
  const location = 'http://localhost:3000/api/v1/dom/image'
  try {
    const response = await fetch(location, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, author: 'scrambled', image: '/resources/favicon.png'  }),
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
      await imageRequest(process.env.SCRAMBLED) // run every "rate"
    }, rate)
  } catch (ex) {
    console.error('[daemon - imaged]', ex)
  }
}

