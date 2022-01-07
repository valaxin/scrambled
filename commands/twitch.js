import { authenticateTwitch, queryForBroadcastStatus } from '../util/twitchAuthorize.js'
import config from '../config.js'

const keys = { id: config.keys.twitch.id, secret: config.keys.twitch.secret }

export default {
    name: 'twitch',
    description: 'Watch on interval if a twitch.tv channel goes live.',
    status: ':red_square:',
    arguments: '',
    execute: async (message, options) => {

      if (!options) {
        message.reply(`missing required argument... ex: ~twitch <twitch-username>`)
      }

      let sent = false
      let flag = false
      let interval = flag ? 1000 : 2000
      
      const check = async () => {
        let auth = await authenticateTwitch(keys.id, keys.secret)
        let stat = await queryForBroadcastStatus(options[0], auth)

        if (!stat.data || stat.data.length == 0) {
          return false
        }

        flag = true
        return stat.data
      }

      const observer = setInterval(async () => {

        let status = await check()
        let name = status[0] === undefined ? options[0] : status[0].user_login

        console.log({ name, interval, flag, sent })
        
        if (flag === true && sent === false) {
          let timestamp = new Date(status[0].started_at).toLocaleTimeString()
          let thumbnail = status[0].thumbnail_url.split('{width}x{height}').join('640x480')
          let embeds = [
            {
              color: 0x6441a4,
              type: 'rich',
              title: `${status[0].user_name} is live on twitch!`,
              description: `[${status[0].title}](https://twitch.tv/${status[0].user_login})`,
              fields: [
                {
                  name: 'Viewers:',
                  value: `${status[0].viewer_count}`
                },
                {
                  name: 'Started:',
                  value: `${timestamp}`
                }
              ],
              image: {
                url: thumbnail,
                height: 0,
                width: 0
              }
            }
          ]
          message.channel.send({ embeds })
          sent = true
        }
      }, interval, false)

      if (options[0] === 'stop') { clearInterval(observer), console.log('cleared') }

  }
}
    