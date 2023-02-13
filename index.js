import fs from 'fs'
import config from './config.js'
import { Client, Collection, Intents } from 'discord.js'

// Define props to Bot constructor 
export const Bot = class extends Client {
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
		this.commands = new Collection()
		this.queue = new Map()
		this.config = config
	}
}

// "make" bot from Bot Class
const client = new Bot(config)

// ... Do the same for slash commands, will also throw if keys aren't found.
const commandFiles = fs.readdirSync(config.commands).filter(file => file.endsWith('.js'))
commandFiles.forEach(async filename => {
	let resource = await import(`${config.commands}/${filename}`)
	client.commands.set(resource.registration.name, resource)
})

// The bot says it's ready for action
client.on('ready', async () => {
	// log('magenta', '[discord.js] Bot Started...')
	// log('green', '[discord.js] Legacy & Slash Commands Loaded...')
	client.user.setPresence(config.presence)

	// register slash commands
	let guild = client.guilds.cache.get(config.guild)
	
	// log('green', `[discord.js] Connected To Guild : "${guild.name}" -- "${guild.id}"`)

	// register if only if there is a guild, to do so otherwise would be foolish!
	if (guild) {
		client.commands.forEach(command => {
			guild.commands.create(command.registration)
			//log('green', `[discord.js] Successfully Registered '/${command.registration.name}'`)
		})
	} else {
		log('red', '[discord.js] What the!? No guild!')
	}
})

// Interaction creates occur when you the human
// interact on the attached servers (guild)
// filter these for commands and call
// the slash commands as needed
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return
	let { commandName, options } = interaction
	let command = client.commands.get(commandName)
	// log('white', `[discord.js] '/${commandName}' invoked by '@${interaction.member.user.username}#${interaction.member.user.discriminator}'`)
	let result = await command.responses(interaction, options)
})

// ... Legacy command message scanning
// look for prefix, if prefix, is command? if not respond with the error
client.on('messageCreate', async message => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	const options = message.content.slice(config.prefix.length).split(/ +/)
	const command = client.legacyCommands.get(options.shift().toLowerCase())
	try {
		// log('blue', `[discord.js] '/${command.name}' invoked by '@${message.member.user.username}#${message.member.user.discriminator}'`)
		command.execute(message, options, client)
	} catch (error) {
		console.error(error)
		message.reply(`Uh-Oh! - Right prefix! Wrong command.`)
	}
})

// generic logging
client.on('reconnecting', () => { console.log('[discord.js] - Reconnecting...') })
client.on('disconnect', () => { console.log('[discord.js] - Disconnected...') })

// Authenticate with Discord.
client.login(config.keys.discord)

export default client
