const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios')

const queryRedditForRandomImage = async (query, options) => {}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Returns a random meme from reddit')
		.addStringOption(
			option => option.setName('subreddit')
				.setDescription('Define a subreddit')
				.setRequired(false)
		),
		async execute(interaction) {
			try {
				const options = {
					subreddit: interaction.options.getString('subreddit'),
				}
				// const results = await contentSearch(omdb.key, options)
				// const row = new ActionRowBuilder()

				const embed = new EmbedBuilder()
					.setColor(0xFFE135)
					.setTitle(`${results.Title} [${results.Year}]`)
					.setURL(`https://imdb.com/title/${results.imdbID}`)
					.setDescription(`Season ${options.season} Episode ${options.episode}`)
					.setThumbnail(`${results.Poster}`)
				
				await interaction.reply({
					embeds: [embed],
					components: [row],
					ephemeral: true
				})
			}
			catch (error) {
				console.error(error)
				await interaction.reply({
					content: `Apologies an error has occured, please try something else.`,
					ephemeral: true
				})
			}
	},
};