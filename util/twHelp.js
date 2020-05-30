const fetch = require('node-fetch')
const { twitch } = require('../config.json').keys

module.exports = {

  getAuth: async (clientId, secret, scope) => {
    if (!clientId || !secret) return false
    let query = `?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials&scope`
    let endpoint = `https://id.twitch.tv/oauth2/token${query}`
    let reqPermission = await fetch(endpoint, {
      method: 'POST'
    })
    let tokens = await reqPermission.json()
    return [tokens, clientId]
  },

  getBroadcastStatus: async (username, tokens) => {
    try {
      let address = `https://api.twitch.tv/helix/streams?user_login=${username}`
      let req = await fetch(address, {
        headers: {
          'Client-Id': tokens[1],
          'Authorization': `Bearer ${tokens[0].access_token}`
        }
      })
      return req.json()
    } catch (err) {
      return new Error(err)
    }
  }
}
