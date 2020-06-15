const fs = require('fs')
const path = require('path')

const updateConfig = async (message, key, value) => {
	let location = path.resolve(__dirname, '../config.json')
	let config = require(location)

	// does the key already exist within the document?
	let existingKey = Object.keys(config).map(configKey => {
		return configKey === key
	})

	if (existingKey) {
		let question = `**Warning!** you're about to overwrite property \`${key}\`, continue? Y/N`
		message.reply(question)

		try {
      let waitOptions = { max: 1, time: 30000 }
      let waitForResponse = await message.channel.awaitMessages(m => m.author.id == message.author.id, waitOptions)
			if (waitForResponse.first().content.match(/^n(o)?$/gi) !== null) {
				// abandon ship!
				message.reply(`**Abandoned!**, try again with a different key name`)
				return
			}
			
			config[key] = value
			await fs.writeFile(location, JSON.stringify(config), 'utf8', (err) => {
				if (err) {
					console.log(err)
					return
				}
			})
			message.reply(`**Huzzah!** successfully updated property`)
			

    } catch (err) {
			message.reply(`**Timeout!** no selection was made`)
			return
    }
	} else {
		message.reply(`***Uh-Oh!***`)
	}

}

module.exports = {
	name: 'set',
	description: 'set differnt values for bot',
	status: ':yellow_square:',
	async execute(message, options) {
		// permission?
		// switch/case on option[0] ? no.
		// cases being? prefix, default alert channel, users (twitch|mixer), MAYBE presence
		// these should all be behind owner/admin roles

		if (options.length < 1) return
		await updateConfig(message, options[0], options[1])
	}
}