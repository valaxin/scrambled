"use strict";

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getImage } = require("../../library/reddit.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("fetch a meme from reddit")
    .addStringOption((option) =>
      option
        .setName("subreddit")
        .setDescription(
          "define the subreddit you wish to fetch from, defaults to r/funny"
        )
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("sort")
        .setDescription(
          "how would you like the data sorted before a random post is picked?"
        )
        .setRequired(false)
        .addChoices(
          {
            name: "top",
            value: "top",
          },
          {
            name: "hot",
            value: "hot",
          },
          {
            name: "new",
            value: "new",
          }
        )
    ),
  async execute(interaction) {
    try {
      const options = {
        slug: interaction.options.getString("subreddit") || "funny",
        sort: interaction.options.getString("sort") || "top",
        limit: 50,
      };
      const results = await getImage(options);
      const getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
      };
      const position = getRandomArbitrary(0, results.length - 1);
      const selected = results[position].data;
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
        ephemeral: false,
      });
      console.report("enjoy the meme", 0);
    } catch (error) {
      console.report(error, 2);
      await interaction.reply({
        content: `Apologies an error has occured, please try something else.`,
        ephemeral: true,
      });
    }
  },
};
