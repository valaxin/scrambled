import Discord from 'discord.js'

export const registration = {
  status: ':red_square:',
  name: 'ping',
  description: 'sends pong'
}

export const responses = async (interaction) => {
  interaction.reply({
    content: 'pong!',
    empheral: true
  })
}