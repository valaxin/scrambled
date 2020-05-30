const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'list all available commands',
	status: 'working',
	execute(message) {
		let str = `**Available Commands:** \n\n`;
		let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (let file of commandFiles) {
			let command = require(`./${file}`);
			str += `\`${command.name}\` - ${command.description} \n - *${command.status}* \n\n`;
		}

		message.channel.send(str);
	},
};