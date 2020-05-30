const fetch = require('node-fetch')
// input 'username' and return mixer channel id
const getChannelId = async username => {
  try {
    let req = await fetch(`https://mixer.com/api/v1/channels/${username}?fields=id`)
    let res = await req.json()
    return res.id
  } catch (e) {
    return new Error(e)
  }
}

// input mixer channel 'id' and return channel broadcast status
const getBroadcastStatus = async id => {
  try {
    let req = await fetch(`https://mixer.com/api/v1/channels/${id}/broadcast`)
    return await req.json()
  } catch (e) {
    return new Error(e)
  }
}

module.exports = {
  name: 'mixer',
  description: 'watch for a given stream to go live',
  async execute(message, options, client) {

    // [0] Check for 'options' if none, return false.
    if (!options) return false

    // [1] Define state 'flag', mixer channel 'id', interval 'timeout', discord 'channel' id
    // and finally the out going 'alertMessage'.
    let flag = false
    let id = await getChannelId(options[0])
    let timeout = !options[1] ? (5 * 60000) : (Number(options[1]) * 60000)
    let channel = (!options[2] ? message.channel.id : options[2]).split(/(([0-9])\w+)/g)[1]
    let alertMessage = `${options[0]} just went live check out the stream! \n> https://mixer.com/${options[0]}`

    // [2] If the 'message' argument isn't explicitly 'false' the message is likly sent from
    // chat attempt to respond
    if (message !== false) {
      message.channel.send(`Okay! I'll keep an eye on ${options[0]} \n> polling every ${(timeout / 60000)} minutes \n> alerts will be sent to <#${channel}>`)
      channel = message.channel.id
    }

    // [3] Define our 'check' routine
    let check = async () => {

      // [3.1] a 'validate' method to read the response for online status
      let validate = status => {
        if (status.online === true) return true
        return false
      }

      // [3.2] request status and act in accorance with flag and response
      let status = await getBroadcastStatus(id)
      // console.log(`before validation: ${options[0]}`, status)
      if (validate(status) === true) {
        if (flag === false) {
          console.log(`${`${options[0]}`.green} online!, gonna send a message to chat!`.white)
          await message.channel.send(alertMessage)
          flag = true
        } else {
          console.log(`${`${options[0]}`.green} online!, flag=true; message was already sent!`.white)
        }
      } else {
        console.log(`${`${options[0]}`.green} is offline`.white)
        flag = false
      }

    }

    // [4] run inital 'check', basically do above
    await check()

    // [5] start interval preforming 'check' method every 'timeout'
    setInterval(async () => {
      await check()
    }, timeout, false)

  }
}