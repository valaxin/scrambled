'use strict'

import 'dotenv/config'
import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'

const name = 'song'
const description = 'see the currently playing song if any to be displayed on stream, if stream.'

const embed = new EmbedBuilder().setTitle(name).setDescription(description)

const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)

export default {
  data,
  async execute(interaction) {
    try {
      const cmd = {
        author: encodeURI(interaction.user.username),
      }

      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: process.env.SCRAMBLED,
          force: true,
        }),
      }

      const response = await fetch(`http://localhost:3000/api/v1/display/song`, opts)

      console.log(opts, {... response} )

      const data = await response.json()

      console.log('!!', data)

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } catch (ex) {
      console.log(ex)
    }
  },
}
