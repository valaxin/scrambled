const { Events } = require("discord.js");
const { keys } = require("../config.json");
const { name, version } = require('../../package.json');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {

    const channel = client.channels.cache.get(keys.discord.channels.default)
    const guild = client.guilds.cache.get(keys.discord.guild)

    console.log(`\n[${Date.now()}] ${client.user.username}#${client.user.discriminator}@"${guild.name}"<${guild.id}> (${name}@${version}) READY!\n\n`)

    // channel.send() will send a message to the default channel...

  }
}
