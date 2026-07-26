'use strict'

import { ActivityType } from 'discord.js'

/**
 * define a presense object for the bot
 */

const presence = {
  afk: false,
  status: 'online',
  activities: [
    {
      name: '...',
      type: ActivityType.Custom,
      state: 'In Development'
    },
  ],
}

export default presence
