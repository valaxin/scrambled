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

      console.log({
        token: process.env.SCRAMBLED,
        author: cmd.author,
        message: cmd.message,
        source: 'discord',
      })

      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: process.env.SCRAMBLED,
          author: cmd.author,
          content: cmd.message,
          source: 'discord',
        }),
      }

      // gate command with role?

      const localAddress = `http://${process.env.HOST}:${process.env.PORT}`

      /// console.log(opts, { ...response })
      const response = await fetch(`${localAddress}/api/message`, opts)
      const data = await response.text()
      // console.log(data)
      embed.setTitle(`"${decodeURI(cmd.message)}"`)
      embed.setDescription(`...has been sent to stream.`)

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } catch (ex) {
      console.log(ex)
    }
  },
}