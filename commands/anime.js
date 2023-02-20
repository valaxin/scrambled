import { Constants } from 'discord.js'
import * as ccLog from '../utilities/colorConsoleLog.js'
import * as getAnime from '../utilities/queryForAnime.js'

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

export const responses = async (interaction) => {
  ccLog(`anime command invoked!`, 'green')
  interaction.reply({})
}