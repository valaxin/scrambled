const colors = require('colors')
const util = require('./_utilities.js')
const { keys } = require('./_config.js')

module.exports = class {

  constructor (client) {
    this.bot = client
  }

  async meme (message, options) {
    if (options[0]) {
      await message.channel.send({ embed: util.getRandomRedditPost(options[0]) })
    } else {
      await message.channel.send({ embed: util.getRandomRedditPost() })
    }
  }

}