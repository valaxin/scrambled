'use strict'

/**
 * simply define a presense object for the bot
 */

export default presence = {
  afk: false,
  status: 'online',
  activities: [
    {
      name: 'activity',
      state: 'in development',
      type: 'watching',
      url: 'https://github.com/valaxin/scrambled',
    },
  ],
}
