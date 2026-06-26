'use strict'

import axios from 'axios'

export const media = async function (key, options) {
  if (!key) throw new Error('Missing OMDB Key')
  if (!options.query || options.query < 1) throw new Error('Missing Query')

  try {
    const endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURI(options.query)}`
    const response = await axios.get(endpoint)

    // ...
    const results = await response.data.Search.map((result) => {
      return result.Type === options.type.toLowerCase() ? result : null
    })

    if (results === null) {
      throw new Error('Sorry! Nothing found for that query.')
    }

    const domains = ['vidsrc-embed.ru', 'vidsrc-embed.su', 'vidsrcme.su', 'vsrc.su']
    
    for (const [i, res] of Object.entries(results)) {
      if (res?.imdbID) {
        if (options.type === 'series') {
          res.urls = domains.map((domain) => {
            return `https://${domain}/embed/tv?imdb=${res.imdbID}&season=${options.season}&episode=${options.episode}`
          })
        }
        if (options.type === 'movie') {
          res.urls = domains.map((domain) => {
            return `https://${domain}/embed/movie?imdb=${res.imdbID}`
          })
        }
      }
    }

    // filter out nulls
    const filtered = results.filter(r => r != null)
    return filtered

  } catch (exception) {
    console.error(`[bot/helpers/media-broker.js]`, exception)
    throw new Error(exception)
  }
}
