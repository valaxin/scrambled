'use strict'

import 'dotenv/config'
import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import calendar from '../helpers/get-remote-cal'

// static
const name = 'update'
const description = 'manually check brightspace for updates'

const embed = new EmbedBuilder().setTitle(name).setDescription(description)

const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)

export default {
  data,
  async execute(interaction) {
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
}
