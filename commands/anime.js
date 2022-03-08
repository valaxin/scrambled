import fetch from 'node-fetch'

const APIBase = 'https://lite-api.animemate.xyz'

async function embed(data) {

	// "dumb" fix for 1024 charater length limit on text fields...
	if (data.anime_summary.length >= 1000) {
		data.anime_summary = data.anime_summary.substr(0, 1000) + '...' 
	} 

	return {
		components: [{
			type: 1,
			components: [{
					style: 5,
					label: `Stream`,
					url: data.idealLinks.stream,
					disabled: false,
					type: 2
				},
				{
					style: 5,
					label: `Direct Download`,
					url: data.idealLinks.download,
					disabled: false,
					type: 2
				},
				{
					style: 3,
					label: `Next Episode`,
					custom_id: `next_episode`,
					disabled: false,
					type: 2
				}
			]
		}],
		embeds: [{
			type: 'rich',
			title: `${data.animetitle} - [${data.anime_year}]`,
			description: `Episode ${data.selectedEpisode} of ${data.total_episodes}`,
			color: 0xa6b7b7,
			thumbnail: {
				url: data.thumbnail,
				height: 0,
				width: 0
			},
			fields: [{
				name: 'Summary',
				value: data.anime_summary,
				inline: true
			}],
			footer: {
				text: `Results Obtained From Anime Mate API`,
				icon_url: `https://animevibe.se/192x192.png`
			}
		}]
	}
}

async function search(query) {
	try {
		let response = await fetch(`${APIBase}/search/${encodeURI(query.toLowerCase())}`)
		let data = await response.json()
		data.map(a => a.slug = a.url.split('/anime/')[1])
		return data
	} catch (err) {
		return new Error(err)
	}
}

async function streams(slug, episode) {
	try {
		let response = await fetch(`${APIBase}/episode/${slug}/${episode}`)
		let data = await response.json()
		return data
	} catch (err) {
		return new Error(err)
	}
}

async function information(slug) {
	try {
		let response = await fetch(`${APIBase}${slug}`)
		let data = await response.json()
		return data
	} catch (error) {
		return new Error(err)
	}
}

function SSBDownloadLink(link) {
	let chunks = link.split('/e/')
	return `${chunks[0]}/dl?op=download_orig&id=${chunks[1]}&mode=h`
}

async function baseRoutine(message, options) {
	let IML = []

	let parameters = {
		episode: isFinite(parseInt(options[0])) ? parseInt(options[0]) : 1,
		query: message.content.split('"')[1].split(' ').join(' ')
	}

	let results = await search(parameters.query)
	let question = `**Please respond with the number of the series you want.**\n\n`
	let range = results.length
	
	results.map((item, index) => {
		while (index <= results.length) {
			let outgoingMessage = `**${index + 1}** : \`${item.animetitle}\` \n`
			question = question += outgoingMessage
			return item
		}
	})

	let sent = await message.channel.send(question)

	IML.push(sent.id)

	const filter = response => {
		const selection = parseInt(response.content)
		if (selection <= range) {
			return true
		}
	}

	try {
		const collection = await message.channel.awaitMessages({
			filter,
			max: 1,
			time: 15000,
			errors: ['time']
		})
		const selectedValue = collection.first().content - 1

		message.channel.sendTyping()

		IML.push(collection.first().id)

		let infos = await information(results[selectedValue].url)

		if (infos[0].total_episodes < parameters.episode) {
			parameters.episode = infos[0].total_episodes
		} else if (parameters.episode < 1) {
			parameters.episode = 1
		}

		let links = await streams(results[selectedValue].slug, parameters.episode)

		let selection = {
			p: parameters,
			idealLinks: {},
			selectedEpisode: parameters.episode,
			links: links[0],
			...results[selectedValue],
			...infos[0]
		}

		for (const link in selection.links) {

			if (link === 'streamsb') {
				selection.idealLinks.download = SSBDownloadLink(selection.links[link])
				selection.idealLinks.stream = selection.links[link]
			}

			// handle other links here...

		}

		let embeds = await embed(selection)

		for (let j = 0; j <= IML.length - 1; j++) {
			let m = await message.channel.messages.fetch(IML[j])
			m.delete()
		}

		message.reply({
			components: embeds.components,
			embeds: embeds.embeds
		})
		return selection
	} catch (emptyCollection) {
		console.log(emptyCollection)
		message.reply(`**ERROR** - No valid selection was made...`)
		return false
	}
}

async function nextEpisode() {}

export default {
	name: 'anime',
	description: 'Search for an Anime title, returns a stream and/or download link',
	status: ':yellow_square:',
	arguments: '<episode-number>[Number] "<query>"',
	execute: async (message, options, client) => {

		if (!message) return
		if (!options) return

		let current = await baseRoutine (message, options)

		// need one method to fire when the command is called initally

		// then a next episode method that takes data from the inital method to move to the next episode

		// things to consider, keep track of the messages sent from this command work to replace exisiting messages not
		// create new ones

		// in it's current state it does work and works seemingly well so use as much working code as possible

		// an index of available episodes should be kept as previous episode should be later added but isn't a priorty

		
		client.on('interactionCreate', async interaction => {
			if (!interaction.isButton()) return
			if (interaction.customId === 'next_episode') {
				console.log(interaction.message, options, current)
				console.log('get next ep. please')
			} else {
				return false
			}
		})
	}
}