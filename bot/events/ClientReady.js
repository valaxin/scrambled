"use strict";

const path = require('node:path')
const { Events } = require("discord.js");
const { keys, defaults } = require("../data/config.json");
const MonitorTwitch = require("../services/MonitorTwitch.js");

let creators = JSON.readLocalFileSync(path.join(__dirname, "../data/database.json")).creators

module.exports = {
  name: Events.ClientReady,
  creators: creators,
  once: true,
  execute: async (client) => {
    try {
      const guild = client.guilds.cache.get(keys.discord.guild);
      console.report(`Logged into "${guild.name}" [${guild.id}] as "${client.user.username}#${client.user.discriminator}"`, 0);
      
      // invoke monitoring functions...
      await MonitorTwitch(client, 10000, creators || defaults.creators, (error) => {
        if (error) return error
        console.report(`MonitorTwtich() Running...`, 0)
      });
      
      return true
    } catch (error) {
      console.report(`${error}`, 2)
    }
  },
};
