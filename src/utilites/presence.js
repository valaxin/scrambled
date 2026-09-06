'use strict'

import { ActivityType } from 'discord.js'

const presence = {
  afk: false,
  status: 'online',
  activities: [
    {
      name: '...',
      type: ActivityType.Custom,
      state: 'In Development',
    },
  ],
}

export default presence
