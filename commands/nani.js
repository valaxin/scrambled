import { inital, getEpisodeLinks, embed, helpers } from '../utilities/handleAnime.js'

export default {
	name: 'nani',
	description: '',
	status: ':red_square:',
	arguments: '<series-name> <episode-number>[optional]',
	execute: async (message, options, client) => {

    let selection = await inital(message, options)

    client.on('interactionCreate', async interaction => {
			if (!interaction.isButton()) return
			if (interaction.customId === 'next_episode') {

				let previousEmbeds = interaction.message.embeds
				let previousComponents = interaction.message.components
				
				selection.episodeNumber = selection.episodeNumber + 1
				selection.newEpisodes = await getEpisodeLinks(selection.slug, selection.episodeNumber)
				
				for (const link in selection.episodeLinks) {
					if (link === 'streamsb') {
						selection.idealLinks.download = helpers.SSBDownloadLink(selection.episodeLinks[link])
						selection.idealLinks.stream = selection.episodeLinks[link]
					}
				}

				let embeds = await embed (selection)

				if (selection.episodeNumber === selection.total_episodes) {
					embeds.components[0].components.forEach(comp => {
						if (comp.custom_id === 'next_episode') {
							comp.disabled = true
						}
					})
				}

				interaction.update({ embeds: embeds.embeds, components: embeds.components })

				interaction.end() // ? not a function (idk)

			} else {
				return false
			}
		})

  }
}