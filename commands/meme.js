// const fetch = require('node-fetch')
import fetch from 'node-fetch'

const stringToHexColor = str => {
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

const getRandomPost = async (subreddit, sort) => {
  let requestFor = await fetch(`https://api.reddit.com/r/${subreddit || 'blursed'}?limit=100&sort=${sort || 'top'}`)
  let response = await requestFor.json()

  let qualified = response.data.children.reduce((array, obj) => {
    if (obj.data.url.match(/(([a-z0-9]){13}).(?:jpg|jpeg|gif|png|webp)$/g)) {
      obj.isMedia = true
      array.push(obj)
    }
    return array
  }, [])

  // console.log(`QUALIFIED POSTS!!`, qualified.length)

  let randomNumber = Math.floor(Math.random() * (response.data.children.length - 2 + 1) + 1)
  let post = qualified[randomNumber]

  return {
    color: stringToHexColor(post.data.author),
    title: post.data.title,
    description: `${post.data.ups} upvotes on ${post.data.subreddit_name_prefixed.toLowerCase()}`,
    author: {
      name: post.data.author,
      url: `https://reddit.com/u/${post.data.author}`
    },
    image: { url: post.data.url },
    timestamp: new Date(post.data.created * 1000)
  }
}

module.exports = {
  name: 'meme',
  description: 'request a random image from a given subreddit',
  status: ':green_square:',
  async execute (message, options) {
    try {
      let embed = await getRandomPost(options[0], options[1])
      await message.reply({ embed })
    } catch (err) {
      console.log(err)
    }
  } 
}