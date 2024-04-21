const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  getSingleRandomImageFromSubTop25,
} = require("../../support/snooInteractions.js");
const path = require("node:path");
const data = require("../../support/_validateCommand.js")(
  path.basename(__filename).split(".")[0],
  require("../../manifest.json").commands
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(data.filename)
    .setDescription(data.command.description)
    .addStringOption((option) =>
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
        .addChoices(
          {
            name: data.command.arguments[data.arguments[1]].selection[0],
            value: data.command.arguments[data.arguments[1]].selection[0],
          },
          {
            name: data.command.arguments[data.arguments[1]].selection[1],
            value: data.command.arguments[data.arguments[1]].selection[1],
          },
          {
            name: data.command.arguments[data.arguments[1]].selection[2],
            value: data.command.arguments[data.arguments[1]].selection[2],
          }
        )
    ),
  async execute(interaction) {
    try {
      const options = {
        slug:
          interaction.options.getString(data.arguments[0]) ||
          data.command.arguments[data.arguments[0]].default,
        sort:
          interaction.options.getString(data.arguments[1]) ||
          data.command.arguments[data.arguments[1]].default,
        limit: 50,
      };
      const results = await getSingleRandomImageFromSubTop25(options);
      const getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
      };
      const position = getRandomArbitrary(0, results.length - 1);
      const selected = results[position].data;

      console.log(selected);
      const domain = "https://reddit.com/";

      const embed = new EmbedBuilder()
        .setColor(0xffe135)
        .setTitle(selected.title)
        .setImage(selected.url)
        .setDescription(
          `- Posted: **[r/${options.slug}](${domain}/r/${
            options.slug
          })** \n - By: **u/[${selected.author}](${domain}/u/${
            selected.author
          })** \n - Uploaded: **${Date(selected.created).toLocaleString({
            timezone: "EST",
          })}**`
        );

      await interaction.reply({
        embeds: [embed],
        ephemeral: data.command.ephemeral,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `Apologies an error has occured, please try something else.`,
        ephemeral: true,
      });
    }
  },
};
