import { Router } from 'express'
import { authenticateTwitch } from '../util/twitchAuthorize.js'
import client from '../index.js'
import config from '../config.js'
import crypto from 'crypto'

const router = Router()

// Notification request headers
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase()
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase()
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase()
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase()

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification'
const MESSAGE_TYPE_NOTIFICATION = 'notification'
const MESSAGE_TYPE_REVOCATION = 'revocation'

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = 'sha256='

const keys = {
  client_id: config.keys.twitch.id,
  client_secret: config.keys.twitch.secret
}

// obtain bearer token from twitch api -- TEST METHOD!
/*
authenticateTwitch(keys.client_id, keys.client_secret)
  .then(data => console.log(data))
  .catch(console.error)
*/

/*
client.channels.fetch('702760553814163567')
    .then(channel => channel.send('hello!'))
    .catch(console.error)
*/

// Build the message used to get the HMAC.
function getHmacMessage(request) {
  return (request.headers[TWITCH_MESSAGE_ID] + 
      request.headers[TWITCH_MESSAGE_TIMESTAMP] + 
      request.body);
}

// Get the HMAC.
function getHmac(secret, message) {
  return crypto.createHmac('sha256', secret)
  .update(message)
  .digest('hex');
}

// Verify whether our hash matches the hash that Twitch passed in the header.
function verifyMessage(hmac, verifySignature) {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}

router.post('/event-streamup', async (req, res, next) => {
  let secret = config.keys.twitch.subscription_secret
  let message = getHmacMessage(req)
  let hmac = HMAC_PREFIX + getHmac(secret, message)  // Signature to compare

  console.log({
    twitch_sig: req.headers[TWITCH_MESSAGE_SIGNATURE],
    own_sig: hmac
  })

  hmac = req.headers[TWITCH_MESSAGE_SIGNATURE]

  console.log(req.body)

  if (true === verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE])) {

      
      // let notification = JSON.parse(req.body);
      
      let notification = req.body.notification

      if (MESSAGE_TYPE_NOTIFICATION === req.headers[MESSAGE_TYPE]) {
          // TODO: Do something with the event's data.

          console.log(`Event type: ${notification.subscription.type}`);
          console.log(JSON.stringify(notification.event, null, 4));
          
          res.sendStatus(204);
      }
      else if (MESSAGE_TYPE_VERIFICATION === req.headers[MESSAGE_TYPE]) {
          res.status(200).send(notification.challenge);
      }
      else if (MESSAGE_TYPE_REVOCATION === req.headers[MESSAGE_TYPE]) {
          res.sendStatus(204);

          console.log(`${notification.subscription.type} notifications revoked!`);
          console.log(`reason: ${notification.subscription.status}`);
          console.log(`condition: ${JSON.stringify(notification.subscription.condition, null, 4)}`);
      }
      else {
          res.sendStatus(204);
          console.log(`Unknown message type: ${req.headers[MESSAGE_TYPE]}`);
      }
  }
  else {
      console.log('403 - signatures didn\'t match'); 
      res.sendStatus(403);
  }

})

export default router