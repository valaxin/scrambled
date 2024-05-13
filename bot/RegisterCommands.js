
require('./library/_ext'); // add some .__proto__ garbarge
const { REST, Routes } = require("discord.js");
const config = require("./data/config.json");
const fs = require("node:fs");
const path = require("path");

const commands = [];
const foldersPath = path.join(__dirname, config.commands);
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.report(
        `"${filePath}" is missing a required "data" or "execute" property.`,
        1
      );
    }
  }
}

const rest = new REST().setToken(config.keys.discord.token);

(async () => {
  try {
    console.report(
      `Started refreshing ${commands.length} application (/) commands.`,
      1
    );
    const data = await rest.put(
      Routes.applicationGuildCommands(config.keys.discord.client, config.keys.discord.guild),
      { body: commands }
    );
    console.report(
      `Successfully reloaded ${data.length} application (/) commands.`,
      0
    );
  } catch (error) {
    console.report(`${error}`, 2);
  }
})();
