const fetch = require('node-fetch')

const ext = {
  
  stringToHexColor: str => {
    let hash = 0
    let color = '0x'
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF
      color += ('00' + value.toString(16)).substr(-2)
    }
    return Number(color)
  }

}

module.exports = {

  stringToHexColor: ext.stringToHexColor,

  getMixerChannelID: async username => {
    try {
      let req = await fetch(`https://mixer.com/api/v1/channels/${username}?fields=id`)
      let res = await req.json()
      return res.id
    } catch (e) {
      return new Error(e)
    }
  },

  getMixerBroadcastStatus: async id => {
    try {
      let req = await fetch(`https://mixer.com/api/v1/channels/${id}/broadcast`)
      return await req.json()
    } catch (e) {
      return new Error(e)
    }
  },

  getTwitchBroadcastStatus: async (username, clientId) => {
    try {
      let address = `https://api.twitch.tv/helix/streams?user_login=${username}`
      let req = await fetch (address, { headers : { 'Client-Id': clientId } })
      return req.json()
    } catch (err) {
      return new Error(err)
    }
  }
  
}