'use strict'

import 'dotenv/config';

import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { media } from '../helpers/media.js'

const name = 'theatre'
const description = 'print information on how to use this bot'

const embed = new EmbedBuilder()
  .setTitle(name)
  .setDescription(description)
const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addStringOption((option) => {
    return option
      .setName('type')
      .setDescription('[0|M|Movies] or [1|S|Series]')
      .setRequired(true)
  })
  .addStringOption((option) => {
    return option
      .setName('query')
      .setDescription('movie or series title or imdb title id')
      .setRequired(true)
  })

export default {
  data,
  async execute(interaction) {
    // preform query...
    let content = await media(process.env.OMDB_APIKEY, { query: 'star wars', type: 'movie' })
    console.log({content})
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
}
