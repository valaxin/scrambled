const fs = require('fs')
const Discord = require('discord.js')
const Client = require('./client/Client')
const config = require('./config.json')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const client = new Client()
client.commands = new Discord.Collection()

commandFiles.forEach(file => {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
})

client.on('ready', async () => {
	/*
	await Promise.all(config.mixer.map(user => {	
		console.log(user, `mixer`)
		return client.commands.get('mixer').execute(false, [user, '.5', config.channel], client)
	}))
	*/
	await Promise.all(config.twitch.map(user => {
		console.log(user, `twitch`)
		return client.commands.get('twitch').execute(false, [user, '.5', config.channel], client, config.keys.twitch.id)
	}))
})

client.on('reconnecting', () => {	console.log('Reconnecting!') })
client.on('disconnect', () => { console.log('Disconnect!') })

client.on('message', async message => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	let options = message.content.slice(config.prefix.length).split(/ +/)
	let command = client.commands.get(options.shift().toLowerCase())
	try {
		command.execute(message, options, client)
	} catch (error) {
		console.error(error)
		message.reply(`right prefix, wrong command.`)
	}
})

client.login(config.keys.discord)