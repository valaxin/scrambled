'use strict'

import 'dotenv/config'
import { Query } from 'mongoose'
import querystring from 'querystring'

// validate local static token
export default async function ValidateToken (req, res, next) {
  try { 

    if (req?.body) {
      if ('token' in req.body) {
        console.log(`[express] token=req.body, method=${req.method}`)
        if (req.body.token === process.env.SCRAMBLED) {
          req.body.token = true
          next()
        }
      }
    } else if (req?.query) {
      req.body = {} // MAKE BODY OBJECT
      if ('token' in req.query) {
        console.log(`[express] token=req.query, method=${req.method}`)
        if (req.query.token === process.env.SCRAMBLED) {
          req.body.token = true
          next()
        }
      }
    }

    // ... doesn't exist
    if (req.body?.token !== true)  {
      console.log(`[express] missing or invalid token in query or body.`)
      res.sendStatus(403)
    }
    
  } catch (ex) {
    console.log('[scrambed://server/tokens.js] :: Validation Error: ', ex)
    res.sendStatus(500)
  }
}

// get twitch access token
export async function getTwitchAccessToken (req, res, next) {
  let client_id = process.env.TWITCH_CLIENT_ID
  let client_secret = process.env.TWITCH_CLIENT_SECRET
  let refresh_token = process.env.TWITCH_REFRESH_TOKEN
  let tokenEndpoint = process.env.TWITCH_ACCESS_ENDPOINT
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

// get spotify access token
export async function getSpotifyAccessToken (req, res, next) {
  let client_id = process.env.SPOTIFY_CLIENT_ID
  let client_secret = process.env.SPOTIFY_CLIENT_SECRET
  let refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
  let tokenEndpoint = process.env.SPOTIFY_ACCESS_ENDPOINT
  try {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    const reply = await fetch(tokenEndpoint, {
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
    req.spotify = await reply.json()
    next()
  } catch (error) {
    console.error(error.message)
    res.send(500)
  }
}

