const { Client, Collection, Intents } = require('discord.js')

module.exports = class extends Client {
	constructor (config) {
		super({
			disableEveryone: true,
			disabledEvents: ['TYPING_START'],
			intents: [Intents.FLAGS.GUILDS]
		})
		this.commands = new Collection()
		this.queue = new Map()
		this.config = config
	}
}