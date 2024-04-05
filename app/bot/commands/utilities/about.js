const os = require('node:os');
const path = require('node:path');
const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder().setName('about').setDescription('Information about this bot'),
	async execute(interaction) { await interaction.reply('Pong!'); },
};
