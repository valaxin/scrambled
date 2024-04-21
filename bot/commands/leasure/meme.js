const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  getSingleRandomImageFromSubTop25,
} = require("../../support/snooInteractions.js");
const { commands } = require("../../manifest.json");
const path = require("node:path");

const filename = path.basename(__filename).split(".")[0];
if (!commands[filename]) {
  module.exports = new Error("missing information within ./manifest.json");
}

const sentence = (on, at, by) => {
  return ``;
};

const cmd = commands[filename];
const arg = Object.keys(cmd.arguments);

console.log(arg, cmd);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(filename)
    .setDescription(cmd.description)
    .addStringOption((option) =>
      option
        .setName(arg[0])
        .setDescription(cmd.arguments[arg[0]].description)
        .setRequired(cmd.arguments[arg[0]].required)
    )
    .addStringOption((option) =>
      option
        .setName(arg[1])
        .setDescription(cmd.arguments[arg[1]].description)
        .setRequired(cmd.arguments[arg[1]].required)
        .addChoices(
          {
            name: cmd.arguments[arg[1]].selection[0],
            value: cmd.arguments[arg[1]].selection[0],
          },
          {
            name: cmd.arguments[arg[1]].selection[1],
            value: cmd.arguments[arg[1]].selection[1],
          },
          {
            name: cmd.arguments[arg[1]].selection[2],
            value: cmd.arguments[arg[1]].selection[2],
          }
        )
    ),
  async execute(interaction) {
    console.log(arg);
    console.log(cmd.arguments[arg[0]].default);
    try {
      const options = {
        slug:
          interaction.options.getString(arg[0]) ||
          cmd.arguments[arg[0]].default,
        sort:
          interaction.options.getString(arg[1]) ||
          cmd.arguments[arg[1]].default,
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
        ephemeral: cmd.ephemeral,
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
