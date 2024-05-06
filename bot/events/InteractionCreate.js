"use strict";

const { Events } = require("discord.js");

// https://discord.com/developers/docs/interactions/receiving-and-responding
// export a interactionCreate

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    console.report(
      `"/${interaction.commandName}" ${interaction.isChatInputCommand()} ${
        interaction.user
      }/${interaction.guild.id}`,
      0
    );

    // input isn't a command
    if (!interaction.isChatInputCommand()) return;

    // look for matching command
    const command = interaction.client.commands.get(interaction.commandName);

    // command doesn't exist or isn't registered
    if (!command) {
      console.report(
        `No command matching ${interaction.commandName} was found.`, 1
      );
      return;
    }

    // input IS command, matching command IS registered
    try {
      await command.execute(interaction); // = bingo
    } catch (commandError) {
      // if error reply via one of three methods? not sure why this todo: read/investigate
      // guess: dependant on the state of execution within the command?
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
