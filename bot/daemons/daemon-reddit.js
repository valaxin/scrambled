'use strict'

const axios = require('axios')
const fs = require('node:fs')

module.exports = {
  getImage: async (options) => {
    const address = `https://api.reddit.com/r/${options.slug}/${options.sort}.json?limit=${options.limit || 25}`
    const response = await axios.get(address)
    const unfiltered = await response.data.data.children.map((post) => {
      if (post.data.is_self !== true && post.data.post_hint === 'image') {
        if (post.data.over_18 === false) {
          if (post.data.url.includes('i.redd.it')) {
            return post
          }
        }
      }
      return false
      // If given post is 1. not NSFW, 2. an image & 3. not hosted externally
      // --- return a collection of filtered posts based on this critera.
    })

    const posts = unfiltered.filter((item) => item != false)
    if (posts.length > 0) {
      return posts
    }
    return false
  },
  collectionOf: async (sub) => {},
}
