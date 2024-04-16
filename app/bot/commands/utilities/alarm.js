const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

console.log(Client)

module.exports = {
  data: new SlashCommandBuilder().setName("alarm").setDescription("set alarm"),
  async execute (interaction) {
    await interaction.reply('hello from /alarm.js')
  }
}