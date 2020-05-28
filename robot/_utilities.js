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

  getRandomRedditPost: async subreddit => {
    console.log(`https://api.reddit.com/r/${subreddit || 'blursed'}?limit=50&sort=top`)
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

    let obj = {
      color: ext.stringToHexColor(post.data.author),
      title: post.data.title,
      image: {
        url: post.data.url
      },
      author: {
        name: post.data.author,
        url: `https://reddit.com/u/${post.data.author}`
      },
      footer: {
        text: `${post.data.ups} upvotes on ${post.data.subreddit_name_prefixed.toLowerCase()}`
      },
      timestamp: new Date(post.data.created * 1000)
    }
    console.log(`post`, obj)
    return obj
  },

}