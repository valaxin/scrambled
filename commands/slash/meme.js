import Discord from 'discord.js'

export const registration = {
  status: ':red_square:',
  name: 'meme',
  description: 'Get a meme from the internet, free of charge!',
  options: [
    {
      name: 'subreddit',
      description: 'What subreddit should be used?',
      required: false,
      type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }
  ]
}

export const responses = async (interaction) => {

  console.log(interaction)

  interaction.reply({
    
  })
}