const axios = require('axios')
const fs = require('node:fs')

module.exports = {
  getSingleRandomImageFromSubTop25: async (key, limit, sort) => {
    const address = `https://api.reddit.com/r/${key}/${sort}.json?limit=${limit || 25}`
    const response = await axios.get(address)
    return await response.data.data.children.map(post => {

      // if post is 
      // 1. not NSFW
      // 2. an image
      // 3. not hosted externally

      // --- return a random post from a pool generated based on this critera.

      return post
    })
  }
}