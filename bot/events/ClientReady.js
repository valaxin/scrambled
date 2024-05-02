"use strict";

const { Events, EmbedBuilder } = require("discord.js");
const { keys, defaults } = require("../config.json");
const { log } = require("../support/internal.js");
const monitor = require('../support/monitor.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    const guild = client.guilds.cache.get(keys.discord.guild)
    log(
      `[${client.user.username}#${client.user.discriminator}] > [${guild.id}]`,
      0
    );

    // isolate the default channel and guild objects for later use by workers...
    // const channel = client.channels.cache.get(keys.discord.channels.default)
    // example: await worker ({ channel, guild, client, embed: Embedbuilder, log })

    await monitor(client, 10000, defaults.creators, () => {})

  },
};
