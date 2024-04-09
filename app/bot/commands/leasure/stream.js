const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");
const search = require("../../support/searchQuery.js");
const { keys } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stream")
    .setDescription("Watch content from the internet")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("type of content (tv/movie)")
        .setRequired(true)
        .addChoices(
          { name: "series", value: "series" },
          { name: "movie", value: "movie" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("title of the content you wish to see")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("season")
        .setDescription("season interger, defaults to 1")
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("episode")
        .setDescription("episode interger, defaults to 1")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const options = {
        type: interaction.options.getString("type"),
        query: interaction.options.getString("title"),
        season: interaction.options.getString("season") || 1,
        episode: interaction.options.getString("episode") || 1,
      };

      const results = await search(keys.omdb, options); // replace me with call from external file, as per the new structure
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
        .setDescription(`Season ${options.season} Episode ${options.episode}`)
        .setThumbnail(`${results.Poster}`);
      
      if (option.type = 'movie') {
        embed.setDescription()
      }

      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true,
      });
    } catch (error) {
      console.error("[stream.js]", error);
      await interaction.error({
        content: `Apologies an error has occured, please try something else.`,
        ephemeral: true,
      });
    }
  },
};
