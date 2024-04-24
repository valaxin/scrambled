const { Events } = require("discord.js");
const { keys } = require("../config.json");
const { name, version } = require('../../package.json');
const { log } = require('../support/_internal.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {

    const channel = client.channels.cache.get(keys.discord.channels.default)
    const guild = client.guilds.cache.get(keys.discord.guild)

    log(`[${client.user.username}#${client.user.discriminator} Logged On > ${guild.id}]`, 0)
    
    // channel.send() - send a message directly to the channel

    // console.log({ channel, guild })

  }
}
