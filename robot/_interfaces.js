const colors = require('colors')
const util = require('./_utilities.js')

module.exports = class {

  constructor (client) {
    this.bot = client
  }

  async mixer (message, options) {
    
    if (!options) return
    
    let flag = false
    let id = await util.getMixerChannelID(options[0])
    let timeout = !options[1] ? (5 * 60000) : (Number(options[1]) * 60000)
    let channel = (!options[2] ? message.channel.id : options[2]).split(/(([0-9])\w+)/g)[1]
    let alertMessage = `${options[0]} just went live check out the stream! \n> https://mixer.com/${options[0]}`

    if (message !== false) {
      message.channel.send(`Okay! I'll keep an eye on ${options[0]} \n> polling every ${(timeout / 60000)} minutes \n> alerts will be sent to <#${channel}>`)
      channel = message.channel.id
    }

    let check = async () => {

      let validate = status => {
        if (status.online === true) return true
        return false
      }

      let status = await util.getMixerBroadcastStatus(id)
      if (validate(status) === true) {
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

  async twitch (message, options, key) {

    if (!options) return

    let flag = false
    let timeout = !options[1] ? (5 * 60000) : (Number(options[1]) * 60000)
    let channel = (!options[2] ? message.channel.id : options[2]).split(/(([0-9])\w+)/g)[1]
    let alertMessage = `${options[0]} just went live check out the stream! \n> https://twitch.com/${options[0]}`

    if (message !== false) {
      message.channel.send(`Okay! I'll keep an eye on ${options[0]} \n> polling every ${(timeout / 60000)} minutes \n> alerts will be sent to <#${channel}>`)
      channel = message.channel.id
    }

    let check = async () => {

      let validate = status => {
        if (status.data.length > 0 && status.data[0].type === 'live') return true
        return false
      }

      let twitchResponse = await util.getTwitchBroadcastStatus(options[0], key)
      if (validate(twitchResponse) === true) {
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


}