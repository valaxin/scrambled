'use strict'

import 'dotenv/config'
import { Client, Events, ChannelType, GuildMemberManager } from 'discord.js'
import { calendar } from '../helpers/import-calendar.js'
import { checkExisitingForumEvents } from '../helpers/thread-manager.js'

export default {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    try {
      
      // get our guild (the server)
      const guild = await client.guilds.cache.get(process.env.WUMPUS_GUILD)
      console.log(`[discord] logged into "${guild.name}" [${guild.id}] as "${client.user.username}#${client.user.discriminator}"`)
      
      // call all ...
      const courseCalendar = await calendar()
      for (const [k, course] of Object.entries(courseCalendar.courses)) {
        await checkExisitingForumEvents(
          course.location,
          courseCalendar.courses,
          course.forumId,
          ChannelType,
          client
        )
        console.log(`[discord] checking "${course.key}"`)
      }
      return true
    } catch (ex) {
      console.error(`[discord] bot unable to start`, ex)
    }
  },
}
