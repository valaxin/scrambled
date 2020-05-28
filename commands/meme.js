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

  return {
    color: stringToHexColor(post.data.author),
    title: post.data.title,
    description: `${post.data.ups} upvotes on ${post.data.subreddit_name_prefixed.toLowerCase()}`,
    image: {
      url: post.data.url
    },
    author: {
      name: post.data.author,
      url: `https://reddit.com/u/${post.data.author}`
    },
    timestamp: new Date(post.data.created * 1000)
  }
}

module.exports = async (message, options) => {
  console.log(`running "meme" command...`)
  if (options[0]) {
    await message.channel.send({ embed: await getRandomRedditPost(options[0]) })
  } else {
    await message.channel.send({ embed: await getRandomRedditPost() })
  }
}