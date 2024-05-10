const { REST, Routes } = require("discord.js");
const { keys, directory } = require("./data/config.json");
const { log } = require("./library/internal");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const foldersPath = path.join(__dirname, directory);
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

const rest = new REST().setToken(keys.discord.token);

(async () => {
  try {
    console.report(
      `Started refreshing ${commands.length} application (/) commands.`,
      1
    );
    const data = await rest.put(
      Routes.applicationGuildCommands(keys.discord.client, keys.discord.guild),
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