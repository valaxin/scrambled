import { Client, Collection, Intents } from 'discord.js'

export default class extends Client {
	constructor(config) {
		super({
			disableEveryone: true,
			disabledEvents: ['TYPING_START'],
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			]
		})
		this.slashCommands = new Collection()
		this.legacyCommands = new Collection()
		this.queue = new Map()
		this.config = config
	}
}
