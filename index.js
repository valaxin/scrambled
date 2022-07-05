import fs from 'fs'
import Discord from 'discord.js'
import Client from './client.js'
import config from './config.js'

const client = new Client(config)

// client.legacyCommands = new Discord.Collection()
// client.slashCommands = new Discord.Collection()

// GET Legacy Commands
const commandFiles = fs.readdirSync(config.legacyCommands).filter(file => file.endsWith('.js'))
commandFiles.forEach(async filename => {
	let resource = await import(`${config.legacyCommands}/${filename}`)
	client.legacyCommands.set(resource.default.name, resource.default)
})

// GET Slash Commands
const slashCommandFiles = fs.readdirSync(config.slashCommands).filter(file => file.endsWith('.js'))
slashCommandFiles.forEach(async filename => {
	let resource = await import(`${config.slashCommands}/${filename}`)
	client.slashCommands.set(resource.registration.name, resource)
})

// ... Ready state
client.on('ready', async () => {
	console.log('[discord.js] Bot Started...')
	client.user.setPresence(config.presence)

	// Register Slash Commands
	let guild = client.guilds.cache.get(config.guild)
	
	console.log(`[discord.js] Connected Guild : "${guild.name}" -- "${guild.id}"`)

	if (guild) {
		client.slashCommands.forEach(command => {
			guild.commands.create(command.registration)
			console.log(`[discord.js] successfully registered /${command.registration.name} command`)
		})
	} else {
		console.log('No Guild?!')
	}

})

// ... What The Command Does
client.on('interactionCreate', async (interaction) => {
	// IF called IS NOT command. ELSE called IS corrasponding response
	if (!interaction.isCommand()) return
	let { commandName, options } = interaction
	let command = client.slashCommands.get(commandName)
	let result = await command.responses(interaction)
	console.log([interaction])
	console.log('result', result)
})

// ... Legacy command message scanning
client.on('messageCreate', async message => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	const options = message.content.slice(config.prefix.length).split(/ +/)
	const command = client.legacyCommands.get(options.shift().toLowerCase())
	try {
		console.log(command)
		command.execute(message, options, client)
	} catch (error) {
		console.error(error)
		message.reply(`Uh-Oh! - Right prefix! Wrong command.`)
	}
})

client.on('reconnecting', () => { console.log('[discord.js] - Reconnecting...') })
client.on('disconnect', () => { console.log('[discord.js] - Disconnected...') })

client.login(config.keys.discord)

export default client
