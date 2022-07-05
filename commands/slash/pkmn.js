import Discord from 'discord.js'

export const registration = {
  status: ':red_square:',
  name: 'pkmn',
  description: 'Get a Pokedex entry for whatever pokemon you\'d like.'
}

export const responses = async (interaction) => {

  console.log(interaction)

  interaction.reply({})
}