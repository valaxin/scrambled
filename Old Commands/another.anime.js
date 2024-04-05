import { inital, interaction } from '../utilities/_anime.js'

export default {
	name: 'anime',
	description: 'Query & Obtain and episode of anime content',
	status: ':red_square:',
	arguments: '<series-name> <episode-number>[optional]',
	execute: async (message, options, client) => {

    //let selection = await inital(message, options)
		//let int = await interaction(client, selection)

		// 1. user has given input to activate command <prefix><command-name><arguments>
		// -- this command is  "anime" the user provided arguments should look like : <anime-title> <episode-number>
		let selection = await inital(message, options)

		// 2. start return of anime data and wait for user input
		let int = await interaction(client, selection)
  }
}