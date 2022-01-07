import fs from 'fs'
import Discord from 'discord.js'
import Client from './client.js'
import config from './config.js'

let client = new Client()
client.commands = new Discord.Collection()

let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
commandFiles.forEach(async filename => {
	let imp = await import(`./commands/${filename}`)
	let command = imp.default
	client.commands.set(command.name, command)
})

client.on('ready', async () => {
	console.log('Ready!')
	client.user.setPresence({ game: 'something', })
})
client.on('reconnecting', () => {	console.log('Reconnecting!') })
client.on('disconnect', () => { console.log('Disconnect!') })
client.on('messageCreate', async message => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	let options = message.content.slice(config.prefix.length).split(/ +/)
	let command = client.commands.get(options.shift().toLowerCase())

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