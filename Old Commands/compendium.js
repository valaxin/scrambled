import { Constants } from 'discord.js'
import fetch from 'node-fetch'

const staticEndpoints = {
  compendium: ``,
  regions: ``,
}

console.log(Constants)

export const registration = {
  name: 'compendium',
  description: '',
  status: ':red_square:',
  id: '',
  options: [
    {
      name: '',
      description: '',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '',
      description: '',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '',
      description: '',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.BOOLEAN
    }
  ]
}

const queryForItem = () => {} 
const queryForShrine = () => {}

export const responses = async (interaction) => {
  interaction.reply({ embeds: [], empheral: true })
}
