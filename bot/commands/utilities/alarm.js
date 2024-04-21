const path = require("node:path");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { register } = require("../../support/_registerSubscriptions.js");
const vcmd = require("../../support/_validateCommand.js");

const data = vcmd(
  path.basename(__filename).split(".")[0],
  require("../../manifest.json").commands
);

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
