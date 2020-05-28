
const fetch = require('node-fetch')
const { twitch } = require('../config.json').keys

const getAuth = async (clientId, secret, scope) => {
  if (!clientId || !secret) return false
  let query = `?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials&scope`
  let endpoint = `https://id.twitch.tv/oauth2/token${query}`
  let reqPermission = await fetch (endpoint, { method: 'POST' })
  let tokens = await reqPermission.json()

  // !!! purpose break to test failure
  // tokens.access_token += `now_invalid`

  return [ tokens, clientId ]
}

const getBroadcastStatus = async (username, tokens) => {
  try {
    let address = `https://api.twitch.tv/helix/streams?user_login=${username}`
    let req = await fetch (address, { headers : {
      'Client-Id': tokens[1],
      'Authorization': `Bearer ${tokens[0].access_token}`
    } })
    return req.json()
  } catch (err) {
    return new Error(err)
  }
}

module.exports = async (message, options) => {

  
  if (!options) return

  let flag = false
  let timeout = !options[1] ? (5 * 60000) : (Number(options[1]) * 60000)
  let channel = (!options[2] ? message.channel.id : options[2]).split(/(([0-9])\w+)/g)[1]
  let alertMessage = `${options[0]} just went live check out the stream! \n> https://twitch.com/${options[0]}`

  let twitch_tokens = await getAuth(twitch.id, twitch.secret)

  if (message !== false) {
    message.channel.send(`Okay! I'll keep an eye on ${options[0]} \n> polling every ${(timeout / 60000)} minutes \n> alerts will be sent to <#${channel}>`)
    channel = message.channel.id
  }

  let check = async () => {

    let validateOnlineStatus = status => {
      if (status.data && status.data.length > 0 && status.data[0].type === 'live') return true
      return false
    }

    let response = await getBroadcastStatus(options[0], twitch_tokens)
    
    if (validateOnlineStatus(response) === true) {
      if (flag === false) {
        console.log(`${`${options[0]}`.green} online!, gonna send a message to chat!`.white)
        await this.bot.channels.get(channel).send(alertMessage) 
        flag = true
      } else {
        console.log(`${`${options[0]}`.green} online!, flag=true; message was already sent!`.white)
      }
    } else {
      console.log(`${`${options[0]}`.green} is offline`.white)
      flag = false
    }

  }

  await check()
  setInterval(async () => { await check() }, timeout, false)

}
