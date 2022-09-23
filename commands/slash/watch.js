import { Constants } from 'discord.js'
import { obtainMedia } from '../../utilities/helpers.js'

export const registration = {
  status: ':yellow_square:',
  name: 'watch',
  description: 'something needs to be here?',
  options: [
    {
      name: 'subreddit',
      description: 'What subreddit should be used?',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ]
}

export async function responses (interaction, options) {
  console.log(interaction, options)
  let media = await obtainMedia(interaction, options)
  console.log(media)
}