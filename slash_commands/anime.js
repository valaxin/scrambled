import Discord from 'discord.js'

export const registration = {
  name: 'anime',
  description: 'Get episode links for anime content.',
  options: [
    {
      name: 'series',
      description: 'The name of the series you want to watch',
      required: true,
      type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'episode',
      description: 'The episode number you want to watch',
      required: true,
      type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
    }
  ]
}

export const responses = async (interaction) => {
  interaction.reply({
    content: 'blah blah',
    ephemeral: true
  })
}