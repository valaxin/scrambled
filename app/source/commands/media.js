
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
  let output = `https://${availableDomains[0]}/embed/tv?imdb=${response.data.Search[0].imdbID}&season=${opt.season}&episode=${opt.episode}`
  return { output, data: response.data }
}

export const registration = {
  status: ':yellow_square:',
  name: 'media',
  description: 'get media',
  options: [
    {
      name: 'title',
      description: 'string',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'season',
      description: 'string',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.INTEGER
    },
    {
      name: 'episode',
      description: 'string',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.INTEGER
    }
  ]
}

export const responses = async (interaction) => {
  
  let options = {}
  for (let i = 0; i < interaction.options.data.length; i++) {
    switch (interaction.options.data[i].name) {
      case 'title' : 
        options.title   = `${interaction.options.data[i].value}`
      case 'season' :
        options.season  = `${interaction.options.data[i].value}`
      case 'episode' :
        options.episode = `${interaction.options.data[i].value}`
    }
  }
  
  const result = await search (cfg.keys.omdb, options)
  interaction.reply({ embeds: [
    {
      type: 'rich',
      title: `${options.title} S${options.season} E${options.episode}` ,
      description: result.output
    }
  ], empheral: true })
}