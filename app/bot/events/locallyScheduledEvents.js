const { Events } = require("discord.js");
const { defaultChannel } = require("../config.json");
const cron = require("node-cron");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.channels.cache.map((item) => {
      if (item.name) {
        const channel = client.channels.cache.get(defaultChannel);
        /*
        const spam = setInterval(async () => {
          await channel.send("hello");
        }, 5000);
        */
        // console.log(``);
      }
    });
  },
};
