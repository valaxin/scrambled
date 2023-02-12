import { Constants } from 'discord.js'
import { load } from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

// register the slash function with the discord api
export const registration = {
  status: ':red_square:',
  name: 'reel',
  description: 'Fetch instagram reel original video.',
  options: [{
    name: 'url',
    description: 'Instagram reel share address.',
    required: true,
    type: Constants.ApplicationCommandOptionTypes.STRING
  }]
}

/**
 * 
 * @param {String} url Instagram share URL from reel type content.
 * @returns A JSON data object to parsed.
 */

/*
export const requestContent = async (url) => {
  try {
    let data = await axios.get(url, {
      headers: {
        accept: "*\/\*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,en-IN;q=0.7",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36",
      },
    })
    return data.data
  } catch (error) {
    return new Error('ERR: Request To Provided URL Failed.', error)
  }
}
*/

export const requestContent = async (url) => {
  try {
    let response = await fetch (url, { method: 'GET', headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,en-IN;q=0.7',
      'user-agent':
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36',
    }})
    let content = await response.text()
    console.log(content)
    return content

  } catch (err) {
    console.log(err)
  }
}


/**
 * 
 * @param {Object} data JSON obtained from Instagram url source.
 */
export const filterOut = async (data) => {
  
  let $ = load(data)
  try {
    // let script = $('script').eq(4).html()
    // let pageData = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[0])
    // let media = pageData.entry_data.PostPage[0].graphql.shortcode_media

    console.log(pageData)
    // return media

  } catch (error) {
    return new Error('ERR: Parsing Provided Data Failed', error)
  }
}

// declare response in function
export const responses = async (interaction) => {
  let url = interaction.options.get('url').value
  let content = await requestContent(url)
  let info = await filterOut(content)
  console.log(info)
  interaction.reply({
    content: '...processing',
    empheral: true
  })
}
