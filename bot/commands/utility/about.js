'use strict'

import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'

const name = 'about'
const description = 'print information about self'

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
