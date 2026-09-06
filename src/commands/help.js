'use strict'

import { resolve } from 'path'
import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js'
import moment from 'moment'

import probe from '../utilites/system-probe.js'
import getCommands from '../utilites/get-commands.js'

const sysinfo = await probe()
const name = `help`
const description = `Print information about this bot, and some basics on how to use it`

const fields = {}

const data = new SlashCommandBuilder().setName(name).setDescription(description)

export default {
  data,
  async execute(interaction) {
    try {
      console.log(interaction, data)

      let commands = await getCommands(resolve('src/commands'))
      const embed = new EmbedBuilder().setTitle(name).setDescription(description).setColor('Yellow')
      for (const cmd of commands.commands) {
        fields[cmd.name] = {
          name: `\`/${cmd.name}\``,
          value: cmd.description,
          inline: false,
        }

        embed.addFields(fields[cmd.name])
      }

      await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    } catch (error) {
      console.log(`oops! error with the ${name} command`, error)
    }
  },
}
