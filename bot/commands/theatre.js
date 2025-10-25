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
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type Of Content')
        .setRequired(true)
        .addChoices(
          { name: 'Movie', value: 'Movie' },
          { name: 'Series ', value: 'Series' },
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

    // Retrieve user inputs from the slash command
    const type = interaction.options.getString('type')
    const query = interaction.options.getString('query')
    
    // preform query...
    let content = await media(process.env.OMDB_APIKEY, { query, type })

    embed.setThumbnail()
    embed.description = 

    
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
}
