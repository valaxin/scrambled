const fetch = require('node-fetch')

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

const getRandomRedditPost = async subreddit => {
  let req = await fetch(`https://api.reddit.com/r/${subreddit || 'blursed'}?limit=100&sort=top`)
  let res = await req.json()
  
  res.data.children.reduce((array, object) => {
    if (!object.data.url.includes('v.redd.it') &&
      object.data.url.includes('i.redd.it') &&
      object.data.url.includes('.png') || 
      object.data.url.includes('.jpg') ||
      object.data.url.includes('.gif')
    ) {
      object.isImg = true
      array.push(object)
    }
    return array
  }, [])

  let num = Math.floor(Math.random() * (res.data.children.length - 2 + 1) + 1);
  let post = res.data.children[num]

  let embed = {
    color: stringToHexColor(post.data.author),
    title: post.data.title,
    description: `${post.data.ups} upvotes on ${post.data.subreddit_name_prefixed.toLowerCase()}`,
    author: {
      name: post.data.author,
      url: `https://reddit.com/u/${post.data.author}`
    },
    fields: [],
    timestamp: new Date(post.data.created * 1000)
  }

  if (post.data.url.includes('youtu') === true) {
    embed.fields.push({ name: ':play_pause:', value: post.data.url})
  } else {
    embed.image = { url: post.data.url }
  }

  console.log(embed)

  return embed
}

module.exports = {
  name: 'meme',
  description: 'request memes from the internets',
  status: 'semi-working (needs, video handling/filtering)',
  async execute (message, options) {
    try {
      let embedObject = await getRandomRedditPost(options[0] || undefined)
      console.log(em)
      if (embedObject.fields.length == 1) {
        await message.channel.send(embedObject)
        console.log(embedObject.fields[0].value)
        // await message.reply(embedObject.fields[0].value)
      } else {
        await message.reply(embedObject)
      }
    } catch (err) {
      console.log(`error:`, err )
    }
  }
  
}