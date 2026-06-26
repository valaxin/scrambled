'use strict'

import { resolve } from 'path'
import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js'
import moment from 'moment'

import probe from '../utilites/system-probe.js'

const sysinfo = await probe()
const name = `help`
const description = `Print information about this bot, and some basics on how to use it`

const fields = {
  system: {
    name: `System Information`,
    value: `**platform**: ${sysinfo.system.platform}\n**uptime**: ${moment(sysinfo.system.uptime).fromNow()}`,
    inline: false
  },
  application: {
    name: `App Information`,
    value: `**name** ${sysinfo.host.name}\n**version** \`${sysinfo.host.version}\`\n**uptime**:\n**author**: ${sysinfo.host.author.username}`,
    inline: false
  },
  commands: {
    name: 'Command: `/help`',
    value: `This command takes no arguments and returns information about the bot itself`,
    inline: false
  }
}

const data = new SlashCommandBuilder().setName(name).setDescription(description)
const embed = new EmbedBuilder()
  .setTitle(name)
  .setDescription(description)
  .setFields(fields.system, fields.application, fields.commands)

export default {
  data,
  async execute(interaction) {
    try {
      await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    } catch (error) {
      console.log(`oops! error with the ${name} command`, error)
    }
  },
}
