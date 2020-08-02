const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'userinfo',
	description: 'get information about a user.',
	status: ':green_square:',
	execute(message, options, client) {
		let split = message.content.split(/ +/)
		let  args = split.slice(1)
		let user = getUserFromMention(args[0], client)
		message.channel.send(`Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({ dynamic: true })}`)
	}
}