import fs from 'fs'
import Discord from 'discord.js'
import Client from './client.js'
import config from './config.js'

const client = new Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
commandFiles.forEach(async filename => {
	const imp = await import(`./commands/${filename}`)
	const command = imp.default
	client.commands.set(command.name, command)
})

client.on('ready', async () => {
	console.log('[discord.js] Bot Started...')
	client.user.setPresence(config.presence)
})

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
	const command = client.commands.get(options.shift().toLowerCase())

	try {
		console.log(command)
		command.execute(message, options, client)
	} catch (error) {
		console.error(error)
		message.reply(`right prefix, wrong command.`)
	}
})

client.login(config.keys.discord)

export default client