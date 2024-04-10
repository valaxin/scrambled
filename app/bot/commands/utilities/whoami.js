const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName('whoami').setDescription("whoami"),
  async execute(interaction) {
    try {
      await interaction.embed()
    } catch (error) {
      return error
    }
  },
}