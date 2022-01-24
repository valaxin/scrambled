import { authenticateTwitch, queryForUserId, createNewSubscription  } from '../util/twitchHelpers.js'
import fetch from 'node-fetch'

const REGISTER_URL = 'http://localhost:3000/twitch/register-event-subscription'

export default {
    name: 'twitch',
    description: 'Watch on interval if a twitch.tv channel goes live.',
    status: ':red_square:',
    arguments: 'create, delete, list | @twitch-username <',
    execute: async (message, options) => {

      if (!options || options.length < 2) {
        message.reply(`missing required argument... ex: ~twitch <twitch-username>`)
        return
      }


      let outgoingRequest = await fetch (
        REGISTER_URL,
        { 
          method: 'POST',
          body: JSON.stringify({
            broadcaster: options[1],
            channel: options[2]
          })
        }
      )

      // The user will submit the needed information for twitch to lookup and user and subscribe to their event, 
      // a request will be sent to the compainion server containing the required information.
      // required information : <verb> <twitch-username> <channel-id>

      // where <verb> is watch, delete, information

      // ... the command should look something like this:
      // ~twitch watch rektcorpse #news


  }
}