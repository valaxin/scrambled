const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'list all available commands',
	status: 'working',
	execute(message) {
		let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
		let embed = { title: 'Available Commands', fields: [] }
		for (let file of commandFiles) {
			let command = require(`./${file}`)
			embed.fields.push( { name: `${command.name}`, value: `${command.description} \n > *${command.status}*` })
		}
		message.reply({ embed })
	},
}