'use strict'

import 'dotenv/config'
import { Client, Events } from 'discord.js'

export default {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    try {
      const guild = client.guilds.cache.get(process.env.WUMPUS_GUILD)
      console.log(`Logged into "${guild.name}" [${guild.id}] as "${client.user.username}#${client.user.discriminator}"`)
      return true
    } catch (error) {
      console.log(`${error}`)
    }
  },
}
