'use strict'

import 'dotenv/config';

import { Client, SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js'
import { media } from '../utilites/media-broker.js'

const name = 'content'
const description = 'A simple command to provide streaming sources.'

const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)

  // movie ...
  .addSubcommand(movie =>
    movie.setName('movie')
      .setDescription('search for a movie, special or short film')
      .addStringOption(query =>
        query.setName('query')
          .setDescription('what are you looking for?')
          .setRequired(true)
      )
  )

  // series ...
  .addSubcommand(series =>
    series.setName('series')
      .setDescription('search for a single episode of a show')
      .addStringOption(query =>
        query.setName('query')
          .setDescription('what are you looking for?')
          .setRequired(true)
      )
      .addIntegerOption(episode =>
        episode.setName('episode')
          .setDescription('episode number?')
          .setMinValue(1)
          .setMaxValue(99)
          .setRequired(true)
      )
      .addIntegerOption(season =>
        season.setName('season')
          .setDescription('season number?')
          .setMinValue(1)
          .setMaxValue(99)
          .setRequired(true)
      )
  )

export default {
  data,
  async execute(interaction) {
    try {

      // Retrieve user inputs from the slash command

      const type = interaction.options._subcommand
      const query = interaction.options.getString('query')
      const episode = interaction.options.get('episode')?.value || false
      const season = interaction.options.get('season')?.value || false

      const limit = 3
      const m_opstring = `... searched for a **${type}** named **${query}**, here are at most **${limit}** results.`
      const s_opstring = `... searched for season **${season}** episode **${episode}** of a **${type}** named **${query}**, here are at most **${limit}** results.`

      // search omdb with data and begin building embed
      const content = await media(process.env.OMDB_APIKEY, { query, type, season, episode })
      const parent = new EmbedBuilder()
        .setTitle(`${name}`)
        .setDescription(type == 'series' ? s_opstring : m_opstring )

      const embeds = []
      
      for (const [index, item] of Object.entries(content)) {
        if (index >= limit) { break }
        embeds.push(
          new EmbedBuilder()
            .setTitle(`0${Number(index) + 1} - ${item.Title} (${item.Year})`)
            .setURL(`https://www.imdb.com/title/${item.imdbID}/`)
            .setDescription(
              item.urls.map((url, i) => `[Source #${i + 1}](${url})`).join('\n')
            )
            .setThumbnail(item.Poster)
            .addFields(
              { name: 'Type', value: item.Type, inline: true },
              { name: 'IMDb ID', value: item.imdbID, inline: true }
            )
        ) 
      }

      // replay
      await interaction.reply({
        embeds: [parent, ...embeds],
        content: '',
        flags: ''
      })
    } catch (err) {
      console.error('new error', err)
    }
  },
}
