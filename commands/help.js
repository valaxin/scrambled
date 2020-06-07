const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'list all available commands',
	status: ':green_square:',
	execute(message) {
		let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
		let embed = { title: 'Available Commands', fields: [] }
		for (let file of commandFiles) {
			let command = require(`./${file}`)
			embed.fields.push( { name: `${command.status} - **${command.name}**`, value: `${command.description}` })
		}
		message.reply({ embed })
	},
}