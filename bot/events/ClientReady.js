const { Events } = require("discord.js");
const { keys } = require("../config.json");
const { name, version } = require('../../package.json');
const log = require('../support/_eventLogger.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {

    const channel = client.channels.cache.get(keys.discord.channels.default)
    const guild = client.guilds.cache.get(keys.discord.guild)

    log(`[${client.user.username}#${client.user.discriminator}@${guild.id}] // (${name}@${version})`, 'READY!')

    // channel.send() will send a message to the default channel...

  }
}
