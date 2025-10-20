'use strict'

import 'dotenv/config';

import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { media } from '../helpers/media.js'

console.log('media', await media(process.env.OMDB_APIKEY, { query: 'star wars', type: 'movie' }))

const name = 'theatre'
const description = 'print information on how to use this bot'

const embed = new EmbedBuilder()
  .setTitle(name)
  .setDescription(description)
const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addStringOption((option) => {
    return option.setName('query').setDescription('MovieTitle').setRequired(true)
  })
  .addStringOption((option) => {
    return option.setName('query').setDescription('MovieTitle').setRequired(true)
  })

export default {
  data,
  async execute(interaction) {
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
}
