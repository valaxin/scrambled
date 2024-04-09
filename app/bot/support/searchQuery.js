const axios = require('axios')

module.exports = async function (key, options) {

    if (!key) throw new Error('Missing OMDB Key');
    if (!options.query || options.query < 1) throw new Error('Missing Query') ;
  
    try {
      const endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURI(options.query)}`
      console.log(endpoint)
      const response = await axios.get(endpoint)
      const data = await response.data
      console.log(data)
      const jsondata = await (
        response.data.Search.map(
          result => { 
            // expects value of type to be 'series' or 'movie'
            return result.Type === options.type ? result : '' 
          }
        )
      )[0]

      console.log(data, jsondata)
    
      const domains = ['vidsrc.in', 'vidsrc.pm', 'vidsrc.xyz', 'vidsrc.net']
      jsondata.urls = domains.map(domain => {
      return `https://${domain}/embed/tv?imdb=${jsondata.imdbID}&season=${options.season}&episode=${options.episode}`
      })

    return jsondata
  } catch (error) {
    console.log('searchQuery', error)
    return error
  }
}

/*
const search = async (key, options) => {
  let endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURI(options.query)}`
	try {
  	let response = await axios.get(endpoint)
		let dataset = (response.data.Search.map(result => { return result.Type === 'series' ? result : '' }))[0]
		let domains = ['vidsrc.in', 'vidsrc.pm', 'vidsrc.xyz', 'vidsrc.net']
		dataset.urls = domains.map(domain => {
			return `https://${domain}/embed/tv?imdb=${dataset.imdbID}&season=${options.season}&episode=${options.episode}`
		})

		return dataset
	} catch (error) {
		return error
	}
}
*/
