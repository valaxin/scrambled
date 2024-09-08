'use strict'

import { Events } from 'discord.js'

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    console.log(`[discord] "${interaction.commandName}" from ${interaction.user}/${interaction.guild.id}`)

    if (!interaction.isChatInputCommand()) return // input isn't a command

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`[discord] no command matching ${interaction.commandName} was found`)
      return
    }

    // input IS command AND registered
    try {
      await command.execute(interaction)
    } catch (commandError) {
      // if error reply via one of three methods? not sure why this todo: read/investigate
      // guess: dependant on the state of execution within the command?
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      }
    }
  },
}
