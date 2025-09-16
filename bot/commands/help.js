'use strict'

import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'

const name = 'help'
const description = 'print information on how to use this bot'

const embed = new EmbedBuilder().setTitle(name).setDescription(description)
const data = new SlashCommandBuilder().setName(name).setDescription(description)

export default {
  data,
  async execute(interaction) {
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
}
