// input mixer channel 'id' and return channel broadcast status
const fetch = require('node-fetch')

module.exports = {
  getBroadcastStatus: async id => {
    try {
      let req = await fetch(`https://mixer.com/api/v1/channels/${id}/broadcast`)
      return await req.json()
    } catch (err) {
      return new Error(err)
    }
  },
  
  getChannelId: async name => {
    try {
      let req = await fetch(`https://mixer.com/api/v1/channels/${name}?fields=id`)
      let res = await req.json()
      return res.id
    } catch (err) {
      return new Error(err)
    }
  }

}