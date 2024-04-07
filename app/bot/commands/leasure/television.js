const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios')
const { omdb } = require('../../config.json')

const contentSearch = async (key, options) => {
  let endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURI(options.query)}`
	try {
  	let response = await axios.get(endpoint)
		let dataset = (response.data.Search.map(result => { return result.Type === 'series' ? result : '' }))[0]
		let domains = ['vidsrc.in', 'vidsrc.pm', 'vidsrc.xyz', 'vidsrc.net']
		dataset.urls = domains.map(domain => {
			return `https://${domain}/embed/tv?imdb=${dataset.imdbID}&season=${options.season}&episode=${options.episode}`
		})

		return dataset
	} catch (error) {
		return error
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tv')
		.setDescription('watch tv content from the internet')
		.addStringOption(
			option => option.setName('query')
				.setDescription('Title of content')
				.setRequired(true)
		)
		.addIntegerOption(
			option => option.setName('season')
				.setDescription('Season number')
				.setRequired(true)
		)
		.addIntegerOption(
			option => option.setName('episode')
				.setDescription('Episode number')
				.setRequired(true)
		),
		async execute(interaction) {
			try {
				const options = {
					query: interaction.options.getString('query'),
					season: interaction.options.getInteger('season'),
					episode: interaction.options.getInteger('episode')
				}
				const results = await contentSearch(omdb.key, options)
				const row = new ActionRowBuilder()
				
				row.addComponents(new ButtonBuilder().setLabel('Stream 1').setURL(results.urls[0]).setStyle(ButtonStyle.Link))
				row.addComponents(new ButtonBuilder().setLabel('Stream 2').setURL(results.urls[1]).setStyle(ButtonStyle.Link))
				row.addComponents(new ButtonBuilder().setLabel('Stream 3').setURL(results.urls[2]).setStyle(ButtonStyle.Link))
				row.addComponents(new ButtonBuilder().setLabel('Stream 4').setURL(results.urls[3]).setStyle(ButtonStyle.Link))
				
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