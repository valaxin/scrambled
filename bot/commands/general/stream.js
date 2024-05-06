"use strict";

const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

const { keys } = require("../../data/config.json");
const search = require("../../library/media.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stream")
    .setDescription("obtain a shareable link to watch movies/tvshows")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("which type of media would you like to look for?")
        .setRequired(true)
        .addChoices(
          {
            name: "series",
            value: "series",
          },
          {
            name: "movie",
            value: "movie",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("title of the content you wish to view")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("season")
        .setDescription("if series, please state the season number")
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("episode")
        .setDescription("if series, please state the episode number")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const options = {
        type: interaction.options.getString("type"),
        query: interaction.options.getString("query") || "zaboomafo",
        season: interaction.options.getNumber("season") || 1,
        episode: interaction.options.getNumber("episode") || 1,
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
        ephemeral: true,
      });
    } catch (error) {
      await interaction.error({
        content: `Apologies an error has occured, please try something else. \n\n \`\`\`${error}\`\`\``,
        ephemeral: true,
      });
    }
  },
};
