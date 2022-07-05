import { Constants } from 'discord.js'
import { embed, information, search } from '../../utilities/anime.js'

export const registration = {
  status: ':red_square:',
  name: 'anime',
  description: 'Get episode links for anime content.',
  options: [
    {
      name: 'series',
      description: 'The name of the series you want to watch',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'episode',
      description: 'The episode number you want to watch',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.NUMBER
    }
  ]
}

// get anime data [1]?



// show anime data [2]?

// how does this handle interactions [3]? 

// can i just hand it an embed and it will render it [4]

export const responses = async (interaction) => {

  let series = interaction.options.get('series')
  let episode = interaction.options.get('episode')

  console.log(`"${interaction.user.username}" is searching for "${series.value}" episode #"${episode.value}"`)
  
  let possibleContent = await search(encodeURI(series.value))

  let question = `**Please respond with the number of the series you want.**\n\n`
	possibleContent.map((result, index) => {
		while (index <= possibleContent.length) {
			question += `**${index + 1}** : \`${result.animetitle}\` \n`
			return result
		}
	})

  let selectedContent = ''

  possibleContent.map(content => {
    console.log(content.animetitle, series.value)
    if (content.animetitle === series.value) {
      selectedContent = content
    }
  })
  
  console.log(selectedContent)
  // console.log(possibleContent, possibleContent.length, question, interaction)

  const embed = {
  }

  /*
  interaction.reply({
    content: question,
    ephemeral: true
  })
  */

  /*
  interaction.reply({
    content: 'blah blah',
    ephemeral: true
  })
  */
}