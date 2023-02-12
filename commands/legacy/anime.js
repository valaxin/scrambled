// import { inital, interaction } from '../../utilities/anime.js'

export default {
	name: 'anime',
	description: 'Query & Obtain and episode of anime content',
	status: ':red_square:',
	arguments: '<series-name> <episode-number>[optional]',
	execute: async (message, options, client) => {

    let selection = await inital(message, options)
		let int = await interaction(client, selection)

  }
}