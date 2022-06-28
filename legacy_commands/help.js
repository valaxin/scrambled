import fs from 'fs'

export default {
	name: 'help',
	description: 'list all available commands',
	status: ':green_square:',
	execute: async (message) => {
		let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
		let embed = {
			title: 'Available Commands',
			fields: []
		}
		for (let file of commandFiles) {
			let command = await import(`./${file}`)
			embed.fields.push({
				name: `${command.default.status} - **${command.default.name}**`,
				value: `\`${command.default.description}\` \narguments: \`${command.default.arguments || 'none'}\``
			})
		}
		message.channel.send({
			embeds: [embed]
		})
	},
}