'use strict'

import 'dotenv/config'
import querystring from 'querystring'

const client_id = process.env.TWITCH_CLIENT_ID
const client_secret = process.env.TWITCH_CLIENT_SECRET
const refresh_token = process.env.TWITCH_REFRESH_TOKEN
const tokenEndpoint = process.env.TWITCH_ACCESS_ENDPOINT

export default async function getTwitchAccessToken(req, res, next) {
  try {
    const reply = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
        client_id,
        client_secret
      }),
    })
    req.twitch = await reply.json()
    next()
  } catch (error) {
    console.error(error.message)
    res.send(500)
  }
}
