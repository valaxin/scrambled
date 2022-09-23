import { Constants } from 'discord.js'
import { load } from 'cheerio'
import axios from 'axios'

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

export const requestContent = async (url) => {
  try {
    const data = await axios.get(url, {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,en-IN;q=0.7",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36",
      },
    })
    return data
  } catch (error) {
    return error
  }
}

export const filterOut = async (data) => {

  let $ = load(data.data)

  try {
    let script = $('script').eq(4).html()
    let pageData = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1])
    let media = pageData.entry_data.PostPage[0].graphql.shortcode_media

    console.log('media:', media)

  } catch (error) {
    console.error(error)
  }
}


export const responses = async (interaction) => {

  let url = interaction.options.get('url').value
  let content = await requestContent(url)
  let info = await filterOut(content)

  console.log(info)

  interaction.reply({
    content: 'not empty',
    empheral: true
  })
}
