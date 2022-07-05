import { getUserFromMention } from '../../utilities/getMention.js'

export default {
	name: 'info',
	description: 'get information about a user.',
	status: ':yellow_square:',
	arguments: '<@mention>',
	execute: async (message, options, client) => {
		let split = message.content.split(/ +/)
		let args = split.slice(1)
		let user = await getUserFromMention(args[0], client)
		message.channel.send(`Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({ dynamic: true })}`)
	}
}