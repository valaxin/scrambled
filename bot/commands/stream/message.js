'use strict'

import 'dotenv/config'
import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'

const name = 'msg'
const description = 'send a message to be displayed on stream, if stream.'

const embed = new EmbedBuilder().setTitle(name).setDescription(description)

const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addStringOption((option) => {
    return option.setName('message').setDescription('the literal alert message you wish to send').setRequired(true)
  })

export default {
  data,
  async execute(interaction) {
    try {
      const cmd = {
        author: encodeURI(interaction.user.username),
        message: encodeURI(interaction.options.getString('message')),
      }

      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: process.env.SCRAMBLED,
          author: cmd.author,
          message: cmd.message,
          timeout: 10000
        }),
      }

      const response = await fetch(`http://localhost:3000/api/v1/display/message`, opts)

      console.log(opts, {... response} )

      const data = await response.json()

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } catch (ex) {
      console.log(ex)
    }
  },
}
