module.exports = {
    name: 'twitch',
    description: 'watch a twitch streamer for go live event',
    status: 'unknown',
    async execute(message, options, client) {

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
            console.log(client)
            await client.channels.get(channel).send(alertMessage)
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
      setInterval(async () => {
        await check()
      }, timeout, false)

    }
  }