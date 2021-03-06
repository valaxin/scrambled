const fetch = require('node-fetch')

module.exports = {
  name: 'video',
  description: 'get vids from the net',
  status: ':yellow_square:',
  execute: async (message, options) => {
    let requestFor = await fetch (`https://api.reddit.com/r/${options[0] || 'youtubehaiku'}?limit=100&sort=${options[1] || 'top'}`)
    let response = await requestFor.json()
    let videos = response.data.children.map(obj => {
      if (obj.data.url.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
        return {
          url: obj.data.url,
          title: obj.data.title,
          author: obj.data.author,
          ups: obj.data.ups
        }
      }
    })
    let ranNum = Math.floor(Math.random() * (response.data.children.length - 2 + 1) + 1)
    let selected = videos[ranNum]
    message.reply(`\n> *title:* **${selected.title}**\n> *by:* ${selected.author} \n> ${selected.url}`)
  }
}