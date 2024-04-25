const { Events, EmbedBuilder } = require("discord.js");
const { keys } = require("../config.json");
const { name, version } = require('../../package.json');
const { log } = require('../support/internal.js')
const { start } = require('../support/cron.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {

    const channel = client.channels.cache.get(keys.discord.channels.default)
    const guild = client.guilds.cache.get(keys.discord.guild)

    log(`[${client.user.username}#${client.user.discriminator} Logged On > ${guild.id}]`, 0)

    log(`Starting CRON jobs...`, 1)

    await start(channel, EmbedBuilder)
    
  }
}
