const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../main.js");
const { register } = require("../../support/_registerSubscriptions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("alarm")
    .setDescription("Set either a oneshot or repeating alarm")
    .addBooleanOption((option) =>
      option
        .setName("repeat")
        .setDescription("should this alarm repeat")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("message").setDescription("message").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("time").setDescription("hh:mm(am|pm)").setRequired(true)
    ),
  async execute(interaction) {
    try {
      const options = {
        repeat: interaction.options.get("repeat").value,
        message: interaction.options.get("message").value,
        time: interaction.options.get("time").value,
        id: `${interaction.user.username}/${
          interaction.guild.id
        }/${Date.now()}`,
      };
      // send options to scheduler and advise user of success
      let result = await register(options);
      await interaction.reply(`${result}`);
    } catch (error) {
      await interaction.reply(`${error}`);
    }
  },
};
