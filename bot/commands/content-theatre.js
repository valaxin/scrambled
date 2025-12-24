'use strict'

import 'dotenv/config';

import { Client, SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js'
import { media } from '../helpers/media-broker.js'

const name = 'theatre'
const description = 'fetch stream links for media'

const embed = new EmbedBuilder()
  .setTitle(name)
  .setDescription(description)

const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type Of Content')
        .setRequired(true)
        .addChoices(
          { name: 'movie', value: 'movie' },
          { name: 'series', value: 'series' },
        ))
  .addStringOption((option) => {
    return option
      .setName('query')
      .setDescription('movie or series title or imdb title id')
      .setRequired(true)
  })

export default {
  data,
  async execute(interaction) {
    try {

      // Retrieve user inputs from the slash command
      const type = interaction.options.getString('type')
      const query = interaction.options.getString('query')
    
      // preform query...
      let content = await media(process.env.OMDB_APIKEY, { query, type })

      console.log('[content-theatre]'[type, query, content])
    

      const results = new EmbedBuilder()
        .setTitle(`/${name}`)
        .setDescription(`@${interaction.user.username} searched for a **${type}** named **${query}**, here are the results.`)

      await interaction.reply({
        embeds: [results],
        content: 'Theatre',
        flags: ''
      })
    } catch (err) {
      console.error('new error', err)
    }
  },
}
