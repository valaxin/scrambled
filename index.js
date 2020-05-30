const fs = require('fs')
const Discord = require('discord.js')
const Client = require('./client/Client')
const config = require('./config.json')

const client = new Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	let command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setPresence(config.presence)
	// for mixer users ...
	config.users.mixer.forEach(async user => {
		await cmd.mixer(false, [user, '.5', options.keys.discord.defaultChannel])
	})
	
	// for twitch users ...
	config.users.twitch.forEach(async user => {
		await cmd.twitch(false, [user, '.5', options.keys.discord.defaultChannel], options.keys.twitch.id)
})
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	let args = message.content.slice(config.prefix.length).split(/ +/);
	let commandName = args.shift().toLowerCase();
	let command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;

	try {
		if(commandName == "ban" || commandName == "userinfo") {
			command.execute(message, client);
		} else {
			command.execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});


client.login(config.keys.discord.token);