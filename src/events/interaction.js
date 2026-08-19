'use strict'

import { Events } from 'discord.js'

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {

    console.log(`[discord] "/${interaction.commandName}" command from ${interaction.user}/${interaction.guild.id}`)

    // check that input is command
    if (!interaction.isChatInputCommand()) {
      return new Error('[discord] input in not a command')
    }

    // when command
    const command = interaction.client.commands.get(interaction.commandName)

    // when command but not ours
    if (!command) {
      return new Error(`[discord] no command matching ${interaction.commandName} was found`)
    }
  
    // execute command
    try {
      await command.execute(interaction)
    } catch (commandError) {
      
      // 
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'error follow up message from the bot',
          ephemeral: true,
        })
      } else {
        await interaction.reply({
          content: 'error reply message from the bot',
          ephemeral: true,
        })
      }
    }
  },
}
