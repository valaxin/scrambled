import fetch from 'node-fetch'

const APIBase = 'https://lite-api.animemate.xyz'

export async function searchFor (query) {
  try {
    const response = await fetch(`${APIBase}/search/${query}`)
    const data = await response.json()
    data.map(a => a.slug = a.url.split('/anime/')[1])
    return data
  } catch (error) { return error }
}

export async function getInformation (slug) {
  try {
		const response = await fetch(`${APIBase}${slug}`)
		const data = await response.json()
		return data
	} catch (error) { return error }
}

export async function getEpisodeLinks (slug, num) {
  try {
		const response = await fetch(`${APIBase}/episode/${slug}/${num}`)
		const data = await response.json()
		return data
	} catch (error) { return error }
}

export async function embed(data) {

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
			description: `Episode ${data.episodeNumber} of ${data.total_episodes}`,
			color: helpers.stringToHexColor(data.animetitle),
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

export const helpers = {
  SSBDownloadLink: link => {
    const chunks = link.split('/e/')
    return `${chunks[0]}/dl?op=download_orig&id=${chunks[1]}&mode=h`
  },
  stringToHexColor: str => {
    let hash = 0
    let color = '0x'
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF
      color += ('00' + value.toString(16)).substr(-2)
    }
    return Number(color)
  },
}

export async function inital (message, options) {

  let messageLog = []
  let storedSelection = {}

  // expected format %PREFIX%%COMMAND% %SERIES-NAME% %EPISODE-NUMBER%
  // options are split into an array with a space charater dilimiter
  // in "../index.js" if the episode number is ALWAYS LAST
  // we can get it by checking the last entry
  
  // get incoming parameters
  let episodeNumber = isFinite(parseInt(options.slice(-1)[0])) ? parseInt(options.slice(-1)[0]) : 1
  let seriesName = encodeURI(options.splice(0, options.length -1).join(' ').toLowerCase())

  // obtain the search results
  let searchResults = await searchFor(seriesName)
  
  // generate the question populating with search results
  let question = `**Please respond with the number of the series you want.**\n\n`
	searchResults.map((result, index) => {
		while (index <= searchResults.length) {
			question += `**${index + 1}** : \`${result.animetitle}\` \n`
			return result
		}
	})
  
  // ask the user
  let promptForSeriesSelection = await message.channel.send(question)

  messageLog.push(promptForSeriesSelection.id) // <- push question message to log array

  // filter method for ensuring response to question is valid
  let filter = response => parseInt(response.content) <= searchResults.length ? true : false

  try {
    // ingest response, and use it to select the requested value from the searchResults array
    let collection = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] })
		let selectedValue = collection.first().content - 1
    let seriesInformation = await getInformation (searchResults[selectedValue].url)

    messageLog.push(collection.first().id) // <- push response message to log array

    // if the number is less than one, set to one
		episodeNumber < 1 ? episodeNumber = 1 : episodeNumber
    // if requested episode is beyond the number provided, set the number to the last episode
    seriesInformation[0].total_episodes < episodeNumber ? episodeNumber = seriesInformation[0].total_episodes : episodeNumber

    // get current episode
    const currentEpisode = await getEpisodeLinks(searchResults[selectedValue].slug, episodeNumber)
    
    // create large object all incoming parameters and obtained content for this episode
    const selection = {
      idealLinks: {},
      episodeNumber,
      seriesName,
      ...searchResults[selectedValue],
      ...seriesInformation[0],
      episodeLinks: currentEpisode[0],
    }
    
    storedSelection = selection

    // generate "ideal Links" (I've noticed that SSB is rather consistant thoughout this API)
    for (const link in selection.episodeLinks) {
			if (link === 'streamsb') {
				selection.idealLinks.download = helpers.SSBDownloadLink(selection.episodeLinks[link])
				selection.idealLinks.stream = selection.episodeLinks[link]
			}
		}

    // create embed/component object passing the large selection object
    const embeds = await embed(selection)

    // delete previous message for a cleaner chat and remove the items from the log
    for (let i = 0; i <= messageLog.length - 1; i++) {
			let loggedMessage = await message.channel.messages.fetch(messageLog[i])
			loggedMessage.delete()
		}
    messageLog = []

    //... reply with embed object

    const finalMessage = await message.reply({ components: embeds.components, embeds: embeds.embeds })

    messageLog.push(finalMessage)
    storedSelection.messageLog = messageLog
     
  } catch (error) {
    console.log(error)
    message.channel.send(`**An Error Occured In Attempting To Obtain Anime Listing**`)
  }
  return storedSelection
}

/*

1. command input of series name and episode number > 2. ask user for series selection > 3. get links for episode in series


*/

// export async question () { return}

// export async components () {}