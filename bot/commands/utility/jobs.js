"use strict";

const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const path = require("node:path");
const { creators, status } = require('../../data/database.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jobs')
    .setDescription('list the active jobs'),
  execute: function (interaction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(0xffe135)
        .setTitle('Jobs')
        .setDescription(`Currently watching...`)

      creators.forEach((entry, index) => {
        if (entry === status[index].username) {
          embed.addFields({ name: entry, value: status[index].live ? ' :green_square: online' : ' :red_square: offline', inline: true })
        }
      })

      interaction.reply({
        embeds: [embed],
        ephemeral: true
      })
    } catch (error) {
      console.report(`${error}`, 2)
    }
  }
}