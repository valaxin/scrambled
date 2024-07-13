'use strict'

import 'dotenv/config'
import { Client, SlashCommandBuilder, EmbedBuilder } from 'discord.js'

const name = 'alert'
const description = 'send a message to the webfront for display'

const embed = new EmbedBuilder().setTitle(name).setDescription(description)

const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addStringOption((option) => {
    return option
      .setName('message')
      .setDescription('the literal alert message you wish to send')
      .setRequired(true)
  })

export default {
  data,
  async execute(interaction) {

    try {

    const cmd = {
      author: encodeURI(interaction.user.username),
      message: encodeURI(interaction.options.getString('message'))
    }

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: process.env.INT_TOKEN
      })
    }

    const response = await fetch(`http://localhost:3000/api/v1/alert/${cmd.author}/${cmd.message}`, opts)

    const data = await response.json()
    
    console.log({ response, data })

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  } catch (ex) {
    console.log(ex)
  }
  },
}
