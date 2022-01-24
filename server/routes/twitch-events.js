import { Router } from 'express'
import { authenticateTwitch } from '../../util/twitchHelpers.js'
import fetch from 'node-fetch'
import client from '../../index.js'
import config from '../../config.js'

const router = Router()

const keys = {
  client_id: config.keys.twitch.client_id,
  client_secret: config.keys.twitch.client_secret
}

function register (req, res, next) {
  
}

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

router.post('/register-event-subscription', async (req, res, next) => {
  console.log(req.body)
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