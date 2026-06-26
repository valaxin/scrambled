'use strict'

/**
 * This file is the entry point for the discord bot,
 * the exported properties and function is invoked when the
 * bot itself is ready to run. anything we want to run on
 * start can be invoked here.
 */

import 'dotenv/config'
import presenceData from '../utilites/bot-presence.js'
import { Events } from 'discord.js'

export default {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    try {
      const guild = await client.guilds.cache.get(process.env.WUMPUS_GUILD)
      client.user.setPresence(presenceData)
      console.log(`[discord] logged into "${guild.name}" [${guild.id}] as "${client.user.username}#${client.user.discriminator}"`)
      return true
    } catch (error) {
      console.error(`[discord] The bot was unable to start`, error)
    }
  },
}
