import yts from 'yt-search'
import play from './play.js'

export default {
	name: 'search',
	description: 'search for youtube video to play',
	status: ':yellow_square:',
	async execute(message, options) {

    if (!message) return
    if (!options) return

    let search = await yts({ query: options[0] || 'memes', })
    let question = `**Please respond with the number of the item you want.**\n\n`
    let selection = search.videos.map((video, index) => {
      while (index <= 4) {
        video.outgoingMessage = `**${index+1}** : \`${video.title} [${video.timestamp}] > ${video.author.name} - posted: ${video.ago}\` \n`
        question = question += video.outgoingMessage
        return video
      }
    }).splice(0, 4)

    message.channel.send(question)

    try {
      let waitOptions = { max: 1, time: 30000 }
      
      let waitForResponse = await message.channel.awaitMessages(m => m.author.id == message.author.id, waitOptions)
      
      if (waitForResponse.first().content[0].match(/^([0-4])/g) !== null) {
        let num = waitForResponse.first().content[0] -1
        console.log(`you typed ${waitForResponse.first().content[0]} and are selecting ${num} from interal array`)
        message.reply(`you selected ${selection[num].outgoingMessage}`)
        message.content = `~play ${selection[num].url}`
        console.log(`!! ${message.content}`)
        await play.execute(message)

      } else {
        message.reply(`"${waitForResponse.first().content}" isn't a valid selection`)
      }
    } catch (err) {
      message.reply(`timeout no selection was made`)
    }

	}
}