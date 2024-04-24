const path = require("node:path");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { log, exists, register } = require("../../support/_internal.js");
const data = exists(__filename);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(data.name)
    .setDescription(data.command.description)
    .addBooleanOption((option) =>
      option
        .setName(data.arguments[0])
        .setDescription(data.command.arguments[data.arguments[0]].description)
        .setRequired(data.command.arguments[data.arguments[0]].required)
    )
    .addStringOption((option) =>
      option
        .setName(data.arguments[1])
        .setDescription(data.command.arguments[data.arguments[1]].description)
        .setRequired(data.command.arguments[data.arguments[1]].required)
    )
    .addStringOption((option) =>
      option
        .setName(data.arguments[2])
        .setDescription(data.command.arguments[data.arguments[2]].description)
        .setRequired(data.command.arguments[data.arguments[2]].required)
    )
    .addStringOption((option) =>
      option
        .setName(data.arguments[3])
        .setDescription(data.command.arguments[data.arguments[3]].description)
        .setRequired(data.command.arguments[data.arguments[3]].required)
    )
    .addStringOption((option) =>
      option
        .setName(data.arguments[4])
        .setDescription(data.command.arguments[data.arguments[4]].description)
        .setRequired(data.command.arguments[data.arguments[4]].required)
        .addChoices(
          {
            name: data.command.arguments[data.arguments[4]].selection[0].key,
            value: data.command.arguments[data.arguments[4]].selection[0].value,
          },
          {
            name: data.command.arguments[data.arguments[4]].selection[1].key,
            value: data.command.arguments[data.arguments[4]].selection[1].value,
          },
          {
            name: data.command.arguments[data.arguments[4]].selection[2].key,
            value: data.command.arguments[data.arguments[4]].selection[2].value,
          },
          {
            name: data.command.arguments[data.arguments[4]].selection[3].key,
            value: data.command.arguments[data.arguments[4]].selection[3].value,
          },
          {
            name: data.command.arguments[data.arguments[4]].selection[4].key,
            value: data.command.arguments[data.arguments[4]].selection[4].value,
          }
        )
    ),
  async execute(interaction) {
    try {
      const payload = {
        id: `${interaction.user.username}/${
          interaction.guild.id
        }/${Date.now()}`,
        [data.arguments[0]]:
          interaction.options.get(data.arguments[0]).value || false,
        [data.arguments[1]]:
          interaction.options.get(data.arguments[1]).value || false,
        [data.arguments[2]]:
          interaction.options.get(data.arguments[2]).value || false,
        [data.arguments[3]]:
          interaction.options.get(data.arguments[3]).value || false,
        [data.arguments[4]]:
          interaction.options.get(data.arguments[4]).value || false
      };

      const result = await register.alarm(payload);
      log(`${result.id} => ${data.name}`, 0);
      await interaction.reply(`${result}`);
    } catch (error) {
      console.log(error)
      log(error, 3);
      await interaction.reply(`${error[0]}`);
    }
  },
};
