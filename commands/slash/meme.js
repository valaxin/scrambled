import Discord from 'discord.js'
import { getRandomPost } from '../legacy/meme.js'

export const registration = {
  status: ':red_square:',
  name: 'meme',
  description: 'Get a meme from the internet, free of charge!',
  options: [{
    name: 'subreddit',
    description: 'What subreddit should be used?',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }]
}

export const responses = async (interaction, options) => {
  let subreddit = options.get('subreddit')
  let content = await getRandomPost(subreddit.value)
  interaction.reply({ embeds: [ content ] })
}