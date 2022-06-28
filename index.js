import fs from 'fs'
import Discord from 'discord.js'
import Client from './client.js'
import config from './config.js'

const client = new Client()

// CREATE Collections for the commands with Discord
client.legacyCommands = new Discord.Collection()
client.slashCommands = new Discord.Collection()

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

console.log(client.slashCommands)
console.log(client.legacyCommands)

// GET Slash Commands
/*
const getSlashCommands = async (directory) => {
	// ! returns promise
	// ...  get directory for files then the files themselves...
	let files = fs.readdirSync(directory).filter(file => file.endsWith('.js'))
	// loop over the found files; importing them into the project
	console.log('located', files)
	
	if (client.slashCommands) {
		console.log(client.slashCommands);
	}

	for (let i = 0; i > files.length -1; i++) {
		let name = filename.split('.js')[0]
		let file = `./${directory || './slash-commands'}/${filename}`
		let command = { name, file, [name]: await import(file) }
		console.log(command)
		commands.push(command)
	}
	return commands
}
*/

/*
console.log(guild)
let slashCmdsLookupTable = {}
slashCommandFiles.forEach(async (filename, index) => {
	console.log(`registering... /${filename}`)
	let commandFile = await import(`./slash-commands/${filename}`)
	let importsObject = new Object([])
	if (guild) {
		slashCommands.create(slashCommandFile.registration)
		console.log(slashCmdsLookupTable, slashCommandFiles, index)
	} else {
		console.log('no guild')
	}
})
*/

client.on('ready', async () => {
	console.log('[discord.js] Bot Started...')
	client.user.setPresence(config.presence)

	// Register the slash commands

	let guild = client.guilds.cache.get(config.guild)
	if (guild) {
		console.log('is guild')
		client.slashCommands.forEach(command => {
			guild.commands.create(command.registration)
			console.log(`successfully registered : /${command.registration.name}`)
		})
	} else {
		console.log('Something Happened!?')
	}

	/*
	let guild = client.guilds.cache.get(config.guild)
		// attempt to import the slash-commands
		if (guild) {
			try {
				let slashCommands = await getSlashCommands('./slash-commands')
				// console.log(guild.id, guild.commands)
				console.log(slashCommands)
				// guild.commands.create(slash.registration)
			} catch (err) {
				console.log(err)
			}
		}
	})
	*/

	/*
	slashCommandFiles.forEach(async filename => {
		// what should we get here?
		// a slash command registration?
		// YEA!
		// as a '.create()' object this will be passed down and executed 
		// with any manually entered commands.
		// note: risk of duplicates?
		// ---
		console.log(`registering... /${filename}`)
		// ---
		// the functionalty of the command comes next?!
		// yes!
		// this will be imported as a function to be exec'd to be more specific
		// anything you would expect from a 'interactionCreate'
		// you'll get the interaction object from discord.js
	
		let importation = await import(`./slash-commands/${filename}`)
	
		console.log(importation)
		let guild = client.guilds.cache.get(config.guild)
		// attempt to import the slash-commands
		if (guild) {
			slashCommands.create(importation.registration)
		}
	})
	*/
	
	/*
	// create command manager using the Guild Id
	let guild = client.guilds.cache.get(config.guild)

	let slashCommands

	// if there is a guild?;
	// use a guild while in development;
	// if they're global it can take >1hr for registration
	if (guild) {
		slashCommands = guild.commands
	} else {
		slashCommands = client.application.commands
	}
	*/

	// CREATE ANIME SLASH COMMAND
	// THE CREATE FUNCTION
	// THIS REGISITERS THE COMMAND WITH "DISCORD"
	// 
	/*
	slashCommands.create({
		name: 'anime',
		description: 'Get episode links for anime content.',
		options: [
			{
				name: 'series',
				description: 'The name of the series you want to watch',
				required: true,
				type: Discord.Constants.ApplicationCommandOptionTypes.STRING
			},
			{
				name: 'episode',
				description: 'The episode number you want to watch',
				required: true,
				type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
			}
		]
	})
	*/

})

// THIS IS THE REACTION YOUR BOT WILL HAVE TO THE COMMAND
// THIS FIRES WHENEVER A USER INTERACTION OCCURS
client.on('interactionCreate', async (interaction) => {

	if (!interaction.isCommand()) {
		console.log('huh!?')
		return
	}

	let { commandName, options } = interaction
	let command = client.slashCommands.get(commandName)
	command.responses(interaction)

/*
	slashCommandFiles.forEach(file => {
		if (file.split('.js')[0] === commandName) {
			console.log(`command found? - ${commandName}`)
			interaction.reply('hello')
			
		}
	})
*/
	/*
	if (commandName === 'anime') {

		interaction.reply({
			content: 'blah blah',
			ephemeral: true
		})
	}
	*/
})

/*-- --*/

client.on('reconnecting', () => {
	console.log('Reconnecting!')
})

client.on('disconnect', () => {
	console.log('Disconnect!')
})

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

client.login(config.keys.discord)

export default client
