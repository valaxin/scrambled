const { Events } = require("discord.js");
const { defaultChannel } = require('../config.json')
const cron = require('node-cron');


module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    let channels =  client.channels.cache.map(item => {
    if console.log(item.name)) {
      const channel = client.channels.cache.get(defaultChannel);
      let spam = setInterval(async () => { await channel.send('hello')  }, 5000)
  },
};
