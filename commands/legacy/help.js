import fs from 'fs'
import rc from '../../config.js'
import path from 'path'

// console.log('rc.legacyCommands', rc.legacyCommands, 'rc.slashCommands', rc.slashCommands)

export default {
	name: 'help',
	description: 'list all available commands',
	status: ':green_square:',
	execute: async (message) => {

		let legacyCommandFiles = fs.readdirSync(rc.legacyCommands).filter(file => file.endsWith('.js'))
		let slashCommandFiles = fs.readdirSync(rc.slashCommands).filter(file => file.endsWith('.js'))
		
		let embed = {
			title: 'Available Commands',
			fields: []
		}
		
		for (let file of legacyCommandFiles) {
			let command = await import(`./${file}`)
			embed.fields.push({
				name: `${command.default.status} - **${command.default.name}**`,
				value: `\`${command.default.description}\` \narguments: \`${command.default.arguments || 'none'}\``
			})
		}
		
		for (let file of slashCommandFiles) {
			// console.log(file)
			let command = await import(path.resolve(rc.slashCommands, file))
			// console.log(command)
			embed.fields.push({
				name: `:SLASH-COMMAND: - ${command.registration.status || 0} - **${command.registration.name}**`,
				value: `\`${command.registration.description}\``
			})
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	},
}