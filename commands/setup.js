const fs = require('fs')

module.exports = {
	name: 'setup',
	description: 'setup questions for creating a config file',
	status: 'WIP',
	execute(message, options) {
		message.channel.send(`Hi!`)
	},
}