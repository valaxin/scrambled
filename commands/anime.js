import { Constants } from 'discord.js'
import * as getAnime from '../utilities/queryForAnime.js'
// import { episode, information, search } from '../../utilities/anime.js'
// import { streamLink, shortenString, stringToHexColor } from '../../utilities/helpers.js'

// Slash Command Registration Object, Check Discord.js Documentation for more info and syntax.
export const registration = {
  status: ':red_square:',
  name: 'anime',
  description: 'Get and print episode links for queried anime content.',
  options: [{
      name: 'series',
      description: 'The name of the series you want to watch',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'episode',
      description: 'The episode number (default = 1) you want to watch',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.NUMBER
    },
    {
      name: 'subtitles',
      description: 'Subtitled japanese or american dub if available.',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.BOOLEAN
    }
  ]
}

// Operational Code, Actions taken when user submits the command hook with arguments.
export const responses = async (interaction) => {

  /*
  // The arguments provided by with user.
  let series = interaction.options.get('series') // String
  let number = interaction.options.get('episode') // String
  let subtitles = interaction.options.get('subtitles') // Boolen
  
  // Locate selection anime based on provided string,
  // example: search for "Dragon Ball (Dub)", this attampts to
  // match 'slug' values like: "dragon-ball-dub".
  let slugArgument = ''
  if (subtitles != null) {
    if (subtitles.value === true) {
      slugArgument = `${series.value.toLowerCase().split(' ').join('-')}`
    } else {
      slugArgument = `${series.value.toLowerCase().split(' ').join('-')}-dub`
    }
  } else { slugArgument = `${series.value.toLowerCase().split(' ').join('-')}-dub` }
  
  let possibleContent = await search(encodeURI(series.value))
  
  let content = possibleContent.filter(item => {
    if (item.slug === slugArgument) {
      return item
    }
  })

  if (content.length === 0) {
    content[0] = possibleContent[0]
  } 

  // Obtain data about the selected episode.
  let info = await information(content[0].url)
  let links = await episode(content[0].slug, number.value)


  // console.log({ slugArgument, subtitles, series, number, content, possibleContent, info, links })


  // Reply with the desired episode information.
  interaction.reply({
    tts: false,
    components: [
      {
        type: 1,
        components: [
          {
            style: 5,
            label: `${info[0].animetitle} (${info[0].alternate_titles}) - #${number.value}`,
            url: links[0].streamsb,
            disabled: false,
            type: 2
          }
        ]
      }
    ],
    embeds: [
      {
        type: `rich`,
        title: `${info[0].animetitle}`,
        color: stringToHexColor(info[0].animetitle),
        description: '#' + info[0].anime_genre.replace(/\s+/g, '').split(',').join(' #'),
        image: {
          url: `${info[0].thumbnail}`,
        },
        fields: [
          {
            name: `Released`,
            value: `${info[0].anime_year}`,
            inline: true
          },
          {
            name: `Episodes`,
            value: `${info[0].total_episodes}`,
            inline: true
          },
          {
            name: `Status`,
            value: `${info[0].anime_status}`,
            inline: true
          },
          {
            name: 'Summary',
            value: shortenString(250, info[0].anime_summary),
            inline: false
          }
        ],
        footer: {
          text: `Results Obtained From Anime Mate API`,
          icon_url: `https://animevibe.se/192x192.png`
        }
    }]
  })
  */

  interaction.reply({
    
  })

}