const { REST, Routes } = require("discord.js");
const { keys } = require("../config.json");

const rest = new REST().setToken(keys.discord.token);

// ...

// for guild-based commands
rest
  .put(
    Routes.applicationGuildCommands(keys.discord.client, keys.discord.guild),
    { body: [] }
  )
  .then(() => console.log("Successfully deleted all guild commands."))
  .catch(console.error);

// for global commands
rest
  .put(Routes.applicationCommands(keys.discord.client), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
