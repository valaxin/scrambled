import config from '../../config.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { REST, Routes } from 'discord.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const commands = [];
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commandFolderPath = path.join(__dirname, config.commands);
const commandFolderFiles = fs.readdirSync(commandFolderPath).filter(file => file.endsWith('.cjs'));

for (const file of commandFolderFiles) {
	const filePath = path.join(commandFolderPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.keys.wumpus.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(
				config.keys.wumpus.clientId,
				config.keys.wumpus.guildId
			),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();