const fs = require('fs')

module.exports = {
	name: 'test',
	description: 'test test test',
	status: 'testing',
	execute(message, options) {
		message.channel.send(options[0])
	},
}