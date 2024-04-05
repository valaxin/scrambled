
import fs from 'fs'
import axios from 'axios'
import cfg from '../../../config.js'
import { Constants } from 'discord.js'

// INPUTS: query for media by search
// OUTPUT: contructed URL to visit stream of content

export const search = async (key, opt) => {
  let endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURI(opt.title)}`
  let response = await axios.get(endpoint)
  let availableDomains = ['vidsrc.in', 'vidsrc.pm', 'vidsrc.xyz', 'vidsrc.net']
  let output = `https://${availableDomains[0]}/embed/movie?imdb=${response.data.Search[0].imdbID}`
  return { output, data: response.data }
}

export const registration = {
  status: ':yellow_square:',
  name: 'movie',
  description: 'get movie',
  options: [
    {
      name: 'title',
      description: 'string',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ]
}

export const responses = async (interaction) => {
  const options = {}
  options.title = interaction.options.data.map((commandOptions) => {
    return commandOptions.value
  })
  const result = await search (cfg.keys.omdb, options)

  console.log(result.data.search, options)

  interaction.reply({ embeds: [
    {
      type: 'rich',
      title: `${options.title}` ,
      description: result.output
    }
  ], empheral: true })
}