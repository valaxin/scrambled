'use strict'

import 'dotenv/config'
import { Client, Events, GuildMemberManager } from 'discord.js'
import { calendarHandler } from '../helpers/get-remote-cal.js'

export default {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    // anything we want to do when the bot starts should be here.
    try {
      const guild = await client.guilds.cache.get(process.env.WUMPUS_GUILD)
      console.log(
        `[discord] logged into "${guild.name}" [${guild.id}] as "${client.user.username}#${client.user.discriminator}"`
      )
      console.log(`[discord] getting calendar data...`)
      const calendar = calendarHandler()
      return true
    } catch (ex) {
      console.error(`[discord] bot unable to start`, ex)
    }
  },
}
