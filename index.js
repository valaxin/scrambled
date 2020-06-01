const fs = require('fs')
const colors = require('colors')
const Discord = require('discord.js')
const Client = require('./client/Client')
const config = require('./config.json')

const client = new Client()
client.commands = new Discord.Collection()

// console.log(client.channels)

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

commandFiles.forEach(file => {
	let command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
})

client.on('ready', () => {
	client.user.setPresence(config.presence)
	config.users.mixer.forEach(async user => {
		await client.commands.get('mixer').execute(false, [user, '.5', config.keys.discord.defaultChannel], client)
		// console.log(`USER:`, `${user}`.green, `PLAT:`, `MIXER`.cyan)
	})
	config.users.twitch.forEach(async user => {
		await client.commands.get('twitch').execute(false, [user, '.5', config.keys.discord.defaultChannel], client, config.keys.twitch.id)
		// console.log(`USER:`, `${user}`.green, `PLAT:`, `TWITCH`.red)
	})
	console.log('Ready!')
});

client.once('reconnecting', () => {
	console.log('Reconnecting!')
});

client.once('disconnect', () => {
	console.log('Disconnect!')
});

client.on('message', async message => {
	let args = message.content.slice(config.prefix.length).split(/ +/)
	let commandName = args.shift().toLowerCase()
	let command = client.commands.get(commandName)

	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return

	try {
		if(commandName === 'ban' || commandName === 'userinfo') {
			command.execute(message, client)
		} else if (commandName === 'mixer' || commandName === 'twitch') {
			command.execute(message, args, client)
		} else {
			command.execute(message, args)
		}
	} catch (error) {
		console.error(error)
		message.reply('There was an error trying to execute that command!')
	}
})

client.login(config.keys.discord.token)