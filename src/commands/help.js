'use strict'

import { resolve } from 'path'
import { Client, SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js'

import probe from '../utilites/system-probe.js'

const name = 'help'
const description = 'print information on how to use this bot'
const embed = new EmbedBuilder().setTitle(name).setDescription(description)
const data = new SlashCommandBuilder().setName(name).setDescription(description)

console.log(probe)

export default {
  data,
  async execute(interaction) {

    const sysinfo = await probe()

    embed.setFields.

    console.log(sysinfo)

    await interaction.reply({
      embeds: [embed],
      content: 'Private.',
      flags: MessageFlags.Ephemeral,
    })
  },
}
