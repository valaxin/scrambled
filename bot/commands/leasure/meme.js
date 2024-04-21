const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getSingleRandomImageFromSubTop25 } = require('../../support/snooInteractions.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Returns a random meme from reddit")
    .addStringOption((option) =>
      option
        .setName("subreddit")
        .setDescription("Define a subreddit")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('sorting')
        .setDescription('What reddit')
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const options = {
        key: interaction.options.getString("subreddit") || 'funny',
        sort: interaction.options.getString("sorting") || 'hot',
        limit: 50
      };
      const results = await getSingleRandomImageFromSubTop25(options)
      const getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
      }
      const position = getRandomArbitrary(0, results.length - 1)
      const selected = results[position].data

      console.log(selected)

      const embed = new EmbedBuilder()
        .setColor(0xffe135)
        .setTitle(selected.title)
        .setImage(selected.url)
        .setDescription(`--`)

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
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
