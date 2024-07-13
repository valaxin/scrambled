'use strict'

import 'dotenv/config'
import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'

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
        embed.setTitle(name).setDescription(description)
        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        })
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}
