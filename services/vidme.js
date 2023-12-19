import axios from 'axios'
import fs from 'fs'
import cfg from '../config.js'
import { Constants } from 'discord.js'
import pkgInfo from '../package.json' assert { type: 'json' }
import parsers from '../utilities/parser.js'

export const registration = {
  status: ':red_square:',
  name: 'vidme',
  description: 'Attempt to get streamable content from a provided video id.',
  options: [
    {
      name: 'vid',
      description: 'ex: "tt4589218"',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ]
}

// ex: https://vidsrc.me/embed/movie?imdb=

export const constructURL = async (id) => {
  if (!id) return
  let address = `https://vidsrc.me/embed/movie?imdb=${id}`
  return address
}

export const movieEmbedObject = async (data) => {
  return {
    title: `${id}`,
    url: await constructURL() || null,
    description: 'the movie'
  }
}

export const responses = async (interaction) => {
  // let itData = await parsers.parseInteractionData(interaction)
  // let embeds = await movieEmbedObject({ pkgInfo, interaction })
  console.log(`${itData.user.full} issued "${itData.command.type}" "/${itData.command.name}" @ ${new Date().toUTCString()}`)
  interaction.reply({ embeds: [ '' ], empheral: true })
}