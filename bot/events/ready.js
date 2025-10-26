'use strict'

import 'dotenv/config'
import { Client, Events, GuildMemberManager } from 'discord.js'
import { calendar } from '../helpers/import-calendar.js'

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
      
      console.log(`[discord] checking brightspace calendar data`)
      const courseCalendar = await calendar()
      
      // let's handle making forum posts
      // 1. check to see what exist
      // 1.1 get all form posts
      // 1.2 check for matching forum post
      //     if match then move on, else check other criteria
    
      return true
    } catch (ex) {
      console.error(`[discord] bot unable to start`, ex)
    }
  },
}
