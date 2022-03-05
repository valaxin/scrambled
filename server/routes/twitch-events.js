import { Router } from 'express'
import { twitchAccessTokens } from '../../utilities/twitchHelpers.js'
import fetch from 'node-fetch'
import client from '../../index.js'
import config from '../../config.js'

const router = Router()
const subscriptionsURL = 'https://api.twitch.tv/helix/eventsub/subscriptions'
const broadcasterIdURL = 'https://api.twitch.tv/helix/users'
const keys = { id: config.keys.twitch.client_id, secret: config.keys.twitch.client_secret }

// (Blind) Request "Bearer" Access Tokens from Twitch API
// TODO: Add invalid/expired token handling (re-request logic)
async function authenticate (req, res, next) {
  try {
    req._twitch = await twitchAccessTokens(keys.id, keys.secret)
    console.log(`[twitch-api@authenticate()]`, req._twitch)
    next()
  } catch (error) {
    next(new Error('Unable To Obtain Access Tokens From Twitch Service', error))
  }
}

// (Blind) Obtain the "UserId" for a given Twitch username
async function broadcasterId (req, res, next) {
  try {
    let response = await fetch (
      broadcasterIdURL + `?login=${req.body.broadcaster}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${req._twitch[0].access_token}`,
          'Client-Id': req._twitch[1]
        }
      }
    )
    let information = await response.json()
    console.log(`[twitch-api@broadcasterId()]`, information)
    next()
  } catch (error) {
    next(new Error('Unable To Obtain Information For Provided User', error))
  }
}

async function check (req, res, next) {
  // check the subscriptions list for exising sub for given broadcaster
  try {
    let response = await fetch (
      subscriptionsURL + '?status=enabled', 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${req._twitch[0].access_token}`,
          'Client-Id': req._twitch[1]
        }
      }
    )
    return response.json()
    console.log(json)
  } catch (error) {
    next(new Error('Unable To Obtain Subscription List From Provider', error))
  }
}

/* -- -- */

async function register (req, res, next) {}

// is async (then, catch)
const messageChannel = (cid, data, callback) => {
  let date = new Date(data.started_at).toLocaleTimeString()
  console.log(client.channels)
  client.channels.fetch(cid)
    .then(channel => {
      channel.send({
        embeds: [{
          color: 0x6441a4,
          title: `${data.broadcaster_user_name} has just gone live!`,
          description: `${date}`
        }]
      })
      callback()
    })
    .catch(console.error)
}

router.post('/register-event-subscription', authenticate, broadcasterId, async (req, res, next) => {
  res.status(200).send('OK!')
})

// router.post('/delete-event-subscription', async (req, res, next) => {})
// router.post('/event-subscriptions', async (req, res, next) => {})

router.post('/event-streamup', async (req, res, next) => {

  if (req.body.challenge) {
    res.status(200).send(req.body.challenge)
  }

  if (req.body.event.type === 'live') {
    messageChannel(
      '662464387470065714',
      req.body.event,
      (res) => {
        res.status(200).send('thanks')
      })
    }

})

export default router