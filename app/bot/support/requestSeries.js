
module.exports = async function (options) {

  if (!options.query || options.query < 1) return;

  


}
const contentSearch = async (key, options) => {
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
