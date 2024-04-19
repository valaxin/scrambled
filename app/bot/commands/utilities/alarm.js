const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require('../../main.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("alarm")
    .setDescription("Set either a oneshot or repeating alarm")
    .addSubcommand(subcommand =>
      subcommand
        .setName('once')
        .setDescription('Sets a oneshot alarm')
        .addUserOption(option => option.setName('mention').setDescription('Define the users you wish have notified')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('repeats')
        .setDescription('Sets a repeating alarm')),
  async execute(interaction) {
    await interaction.reply("hello from /alarm.js");
  },
};
