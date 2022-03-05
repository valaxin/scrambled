import { queryForUserId, createNewSubscription  } from '../utilities/twitchHelpers.js'
import fetch from 'node-fetch'

const REGISTER_URL = 'http://localhost:3000/twitch/register-event-subscription'

export default {
    name: 'twitch',
    description: 'Register for EventSub w/ Twitch API',
    status: ':red_square:',
    arguments: '<verb> <twitch-username> <channel-id>',
    execute: async (message, options) => {

      if (!options || options.length < 3) {
        message.reply(`ERR MISSING ARG \n ~twitch <verb> <twitch-username> <channel-id>`)
        return
      }

      if (options[0] === 'watch') {
        try {
          let request = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                broadcaster: options[1],
                channel: options[2]
              }
            )
          })
        } catch (error) {
          message.reply(`error ${error}`)
          return
        }
      }

      // The user will submit the needed information for twitch to lookup and user and subscribe to their event, 
      // a request will be sent to the compainion server containing the required information.
      // required information : <verb> <twitch-username> <channel-id>

      // where <verb> is watch, delete, information

      // ... the command should look something like this:
      // ~twitch watch rektcorpse #news


  }
}