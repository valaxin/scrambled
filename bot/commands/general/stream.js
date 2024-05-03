"use strict";

const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

const path = require("node:path");
const { keys } = require("../../data/config.json");
const search = require("../../library/media.js");
const { exists } = require("../../library/internal.js");
const data = exists(path.basename(__filename).split(".")[0]);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(data.name)
    .setDescription(data.command.description)
    .addStringOption((option) =>
      option
        .setName(data.arguments[0])
        .setDescription(data.command.arguments[data.arguments[0]].description)
        .setRequired(data.command.arguments[data.arguments[0]].required)
        .addChoices(
          {
            name: data.command.arguments[data.arguments[0]].selection[0],
            value: data.command.arguments[data.arguments[0]].selection[0],
          },
          {
            name: data.command.arguments[data.arguments[0]].selection[1],
            value: data.command.arguments[data.arguments[0]].selection[1],
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName(data.arguments[1])
        .setDescription(data.command.arguments[data.arguments[1]].description)
        .setRequired(data.command.arguments[data.arguments[1]].required)
    )
    .addNumberOption((option) =>
      option
        .setName(data.arguments[2])
        .setDescription(data.command.arguments[data.arguments[2]].description)
        .setRequired(data.command.arguments[data.arguments[2]].required)
    )
    .addNumberOption((option) =>
      option
        .setName(data.arguments[3])
        .setDescription(data.command.arguments[data.arguments[3]].description)
        .setRequired(data.command.arguments[data.arguments[3]].required)
    ),
  async execute(interaction) {
    try {
      const options = {
        type: interaction.options.getString(data.arguments[0]),
        query:
          interaction.options.getString(data.arguments[1]) ||
          data.command.arguments[data.arguments[1]].default,
        season:
          interaction.options.getNumber(data.arguments[2]) ||
          data.command.arguments[data.arguments[2]].default,
        episode:
          interaction.options.getNumber(data.arguments[3]) ||
          data.command.arguments[data.arguments[3]].default,
      };

      const results = await search(keys.omdb, options);
      if (results === null) {
        throw new Error(
          "Searching returned zero results, check the query and try again."
        );
      }

      const row = new ActionRowBuilder();

      row.addComponents(
        new ButtonBuilder()
          .setLabel("Stream 1")
          .setURL(results.urls[0])
          .setStyle(ButtonStyle.Link)
      );
      row.addComponents(
        new ButtonBuilder()
          .setLabel("Stream 2")
          .setURL(results.urls[1])
          .setStyle(ButtonStyle.Link)
      );
      row.addComponents(
        new ButtonBuilder()
          .setLabel("Stream 3")
          .setURL(results.urls[2])
          .setStyle(ButtonStyle.Link)
      );
      row.addComponents(
        new ButtonBuilder()
          .setLabel("Stream 4")
          .setURL(results.urls[3])
          .setStyle(ButtonStyle.Link)
      );

      const embed = new EmbedBuilder()
        .setColor(0xffe135)
        .setTitle(`${results.Title} [${results.Year}]`)
        .setURL(`https://imdb.com/title/${results.imdbID}`)
        .setThumbnail(`${results.Poster}`);

      let statement =
        "The links below are provided by vid.src, some advice ensure ublock or something alike is installed on your web browser. \n\n";
      if (options.type === "movie") {
        embed.setDescription(`${statement} enjoy the movie`);
      } else {
        embed.setDescription(
          `${statement} Season ${options.season} Episode ${options.episode}`
        );
      }
      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: data.command.ephemeral,
      });
    } catch (error) {
      await interaction.error({
        content: `Apologies an error has occured, please try something else. \n\n \`\`\`${error}\`\`\``,
        ephemeral: true,
      });
    }
  },
};
