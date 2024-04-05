import fs from 'fs'

export default {
	name: 'test',
	description: 'test test test',
	status: 'testing',
	execute(message, options) {
		message.channel.send(options[0])
	},
}