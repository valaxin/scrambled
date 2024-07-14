'use strict'

import 'dotenv/config'
import querystring from 'querystring'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
const tokenEndpoint = process.env.SPOTIFY_ACCESS_ENDPOINT

export default async function getSpotifyAccessToken(req, res, next) {
  try {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    const res = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    })
    req.spotify = await res.json()
    next()
  } catch (ex) {
    console.error('[express] unable to obtain spotify access token: ', ex)
    res.send(500)
  }
}
