const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require('../../main.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("alarm")
    .setDescription("set alarm")
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Info about a user')
        .addUserOption(option => option.setName('target').setDescription('The user')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Info about the server')),
  async execute(interaction) {
    await interaction.reply("hello from /alarm.js");
  },
};
