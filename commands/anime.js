import cheerio from 'cheerio'

export default {
	name: 'anime',
	description: 'Search animegogo for a given anime title',
	status: ':yellow_square:',
	arguments: '<@mention>',
	execute: async (message, options, client) => {
		return false
	}
}