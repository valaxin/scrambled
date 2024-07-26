'use strict'

import 'dotenv/config'
import { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

const name = 'song'
const description = 'get the song currently playing on stream, if any.'

const embed = new EmbedBuilder()
const data = new SlashCommandBuilder().setName(name).setDescription(description)

export default {
  data,
  async execute(interaction) {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: process.env.INT_TOKEN,
          from: 'srambled-bot',
        }),
      }

      const response = await fetch(`http://localhost:3000/api/v1/now-playing`, opts)
      const jsondata = await response.json()

      if (data === 'Currently Not Playing') {
        embed.setTitle(name).setDescription(jsondata)
        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        })
      } else {
        const actionRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel('Spotify').setURL(jsondata.data.songUrl).setStyle(ButtonStyle.Link)
        )
        embed
          .setTitle(jsondata.data.title)
          .setDescription(`${jsondata.data.artist} - ${jsondata.data.album}`)
          .setThumbnail(jsondata.data.albumImageUrl)
        await interaction.reply({
          embeds: [embed],
          components: [actionRow],
          ephemeral: true,
        })
      }
    } catch (ex) {
      console.log(ex)
    }
  },
}
