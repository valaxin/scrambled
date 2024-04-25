const fs = require('node:fs')
const cron = require('node-cron')
const axios = require('axios')

const friendly = [
  { description: "every minute", time: "*/1 * * * *" },
  { description: "every 10 minutes", time: "*/10 * * * *" }
]

async function start (channel, embed) {
  console.log("HELLO!")
  cron.schedule(friendly[0].time, () => {
    channel.send('Hello, (every minute)')
  }, {})
  cron.schedule(friendly[1].time, () => {}, {})
}

module.exports = { start }