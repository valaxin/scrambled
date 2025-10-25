'use strict'

import 'dotenv/config'
import { Client, Events, GuildMemberManager } from 'discord.js'
// import { getCalendar } from '../helpers/get-remote-cal.js'

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
      
      // lets ready iCal events, createCache file
      // const cal = await getCalendar({ key: 'option_value' })

      // console.log(await client.guilds)
      
      return true
    } catch (ex) {
      console.error(`[discord] bot unable to start`, ex)
    }
  },
}
