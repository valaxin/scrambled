const { REST, Routes } = require('discord.js');
const { keys } = require('../../config.json');

const rest = new REST().setToken(keys.wumpus.token);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(keys.wumpus.clientId, keys.wumpus.guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(keys.wumpus.clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
