import fetch from 'node-fetch'
import helpers from './helpers.js'

const APIBase = 'https://lite-api.animemate.xyz'

let invocationCounter = 0
let messageLog = []

export async function search (query) {
  try {
    if (!query) {
      throw 'No Query Value Provided'
    }
    const response = await fetch(`${APIBase}/search/${query}`)
    const data = await response.json()
    data.map(item => item.slug = item.url.split('/anime/')[1])
    return data
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function information (slug) {
  try {
    if (!slug) {
      throw 'No Slug Value Provided'
    }
		const response = await fetch(`${APIBase}${slug}`)
		const data = await response.json()
		return data
	} catch (error) {
    console.error(error)
    return error
  }
}

export async function episode (slug, num) {
  if (!slug) {
    throw 'No Slug/Episode Number valueProvided'
  }
  if (!num) {
    num = 1
  }
  try {
		const response = await fetch(`${APIBase}/episode/${slug}/${num}`)
		const data = await response.json()
		return data
	} catch (error) {
    console.error(error)
    return error
  }
}

export async function embed (data) {

  // "dumb" fix for 1024 charater length limit on text fields...
	if (data.anime_summary.length >= 1000) {
		data.anime_summary = data.anime_summary.substr(0, 1000) + '...' 
	}

  console.log('data', data)

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
					custom_id: `next-episode-${data.slug}`,
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

export async function inital (message, options) {

  invocationCounter++

  console.log('invocationCounter', invocationCounter)
  console.log('messageLogBeforeWipe', messageLog)
  console.log('messageLogBeforeWipeLength', messageLog.length)

  if (invocationCounter > 1) {
    if (messageLog.length > 0) {
      let previousMessageId = messageLog[0].id
      let previousCommandsMessages = await message.channel.messages.fetch(messageLog[0])
      previousCommandsMessages.forEach(item => {
        if (item.id === previousMessageId) {
          item.delete()
        }
      })
    }
  }

  let storedSelection = {}

  // expected format %PREFIX%%COMMAND% %SERIES-NAME% %EPISODE-NUMBER%
  // options are split into an array with a space charater dilimiter
  // in "../index.js" if the episode number is ALWAYS LAST
  // we can get it by checking the last entry
  
  // get incoming parameters
  let episodeNumber = isFinite(parseInt(options.slice(-1)[0])) ? parseInt(options.slice(-1)[0]) : 1
  let seriesName = encodeURI(options.splice(0, options.length -1).join(' ').toLowerCase())

  // obtain the search results
  let searchResults = await search(seriesName)
  
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
    let seriesInformation = await information (searchResults[selectedValue].url)

    messageLog.push(collection.first().id) // <- push response message to log array

    // if the number is less than one, set to one
		episodeNumber < 1 ? episodeNumber = 1 : episodeNumber
    // if requested episode is beyond the number provided, set the number to the last episode
    seriesInformation[0].total_episodes < episodeNumber ? episodeNumber = seriesInformation[0].total_episodes : episodeNumber

    // get current episode
    const currentEpisode = await episode(searchResults[selectedValue].slug, episodeNumber)
    
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

export async function interaction (client, selection) {

  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return
    if (interaction.customId === 'next_episode') {

      let previousEmbeds = interaction.message.embeds
      let previousComponents = interaction.message.components

      selection.episodeNumber = selection.episodeNumber + 1
      selection.episodeLinks = await episode (selection.slug, selection.episodeNumber)

      for (const link in selection.episodeLinks[0]) {
        if (link === 'streamsb') {
          selection.idealLinks.download = helpers.SSBDownloadLink(selection.episodeLinks[0][link])
          selection.idealLinks.stream = selection.episodeLinks[0][link]
        }
      }

      let embeds = await embed (selection)

      if (selection.episodeNumber === selection.total_episodes) {
        embeds.components[0].components.forEach(comp => {
          if (comp.custom_id === `next-episode-${selection.slug}`) {
            comp.disabled = true
          }
        })
      }

      interaction.update({ embeds: embeds.embeds, components: embeds.components })

    } else {
      return false
    }
  })


}