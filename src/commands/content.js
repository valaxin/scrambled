'use strict'

import 'dotenv/config'
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { media } from '../utilites/media.js'

/**
 * Content Command
 * ---------------
 * Purpose: When invoked, with the correct values the user is provided
 *          links to info and stream the requested media.
 *
 * Method:  user is asked for a 'plain-english' title or IMDB title id value
 *          e.g 'tt1234567' this renders information (link to imdb) and a source
 *          to watch the content from the media-broker.js module.
 */

const name = 'content'
const description = 'Simple little command to provide content streaming sources.'

const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)

  // makes a movie request
  .addSubcommand((movie) =>
    movie
      .setName('movie')
      .setDescription('searches for a movie, special or short film')
      .addStringOption((query) =>
        query.setName('query').setDescription('title or peice of title, the closer the better').setRequired(true),
      ),
  )

  // makes television series request
  .addSubcommand((series) =>
    series
      .setName('series')
      .setDescription('search for a single episode of a show')
      .addStringOption((query) =>
        query.setName('query').setDescription('title or peice of title, the closer the better').setRequired(true),
      )
      .addIntegerOption((episode) =>
        episode.setName('episode').setDescription('episode number?').setMinValue(1).setMaxValue(99).setRequired(true),
      )
      .addIntegerOption((season) =>
        season.setName('season').setDescription('season number?').setMinValue(1).setMaxValue(99).setRequired(true),
      ),
  )

export default {
  data,
  async execute(interaction) {
    try {
      // retrieve user inputs from the slash command
      const type = interaction.options._subcommand
      const query = interaction.options.getString('query')
      const episode = interaction.options.get('episode')?.value || false
      const season = interaction.options.get('season')?.value || false

      /*
      if (query.match(/(t{2}[0-9]{7})/g)[0]) {
        // user gave imdb id
        console.log('you gave me an imdb id, thank but this isn\'t implimented')
      }
      */

      const limit = 5
      const m_opstring = `... searched for a **${type}** named **${query}**, here are at most **${limit}** results.`
      const s_opstring = `... searched for season **${season}** episode **${episode}** of a **${type}** named **${query}**, here are at most **${limit}** results.`

      console.log({ query, episode, season })

      // search omdb with data and begin building embed
      const content = await media(process.env.OMDB_APIKEY, { query, type, season, episode })
      const parent = new EmbedBuilder()
        .setTitle(`${name}`)
        .setDescription(type == 'series' ? s_opstring : m_opstring)
        .setColor('Green')

      const embeds = []

      // iterate over the results
      for (const [index, item] of Object.entries(content)) {
        if (index >= limit) {
          break
        }
        embeds.push(
          new EmbedBuilder()
            .setTitle(`0${Number(index) + 1} - ${item.Title} (${item.Year})`)
            .setURL(`https://www.imdb.com/title/${item.imdbID}/`)
            .setDescription(item.urls.map((url, i) => `[Source #${i + 1}](${url})`).join('\n'))
            .setThumbnail(item.Poster)
            .addFields(
              { name: 'Type', value: item.Type, inline: true },
              { name: 'IMDb ID', value: item.imdbID, inline: true },
            ),
        )
      }

      // reply
      await interaction.reply({
        embeds: [parent, ...embeds],
        content: '',
        flags: '',
      })
    } catch (err) {
      console.error('new error', err)
    }
  },
}
