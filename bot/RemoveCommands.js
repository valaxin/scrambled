const { REST, Routes } = require("discord.js");
const { keys } = require("./data/config.json");
const rest = new REST().setToken(keys.discord.token);

rest
  .put(
    Routes.applicationGuildCommands(keys.discord.client, keys.discord.guild),
    { body: [] }
  )
  .then(() => console.report(`Successfully deleted all guild commands.`, 0))
  .catch(console.error);

rest
  .put(Routes.applicationCommands(keys.discord.client), { body: [] })
  .then(() => console.report(`Successfully deleted all application commands.`, 0))
  .catch(console.error);
