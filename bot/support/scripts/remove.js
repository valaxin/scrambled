const { REST, Routes } = require("discord.js");
const { keys } = require("../../config.json");
const { log } = require("../../support/internal.js");
const rest = new REST().setToken(keys.discord.token);

rest
  .put(
    Routes.applicationGuildCommands(keys.discord.client, keys.discord.guild),
    { body: [] }
  )
  .then(() => log(`Successfully deleted all guild commands.`, 0))
  .catch(console.error);

rest
  .put(Routes.applicationCommands(keys.discord.client), { body: [] })
  .then(() => log(`Successfully deleted all application commands.`, 0))
  .catch(console.error);
