"use strict";

const { Events, EmbedBuilder } = require("discord.js");
const { keys, defaults } = require("../data/config.json");
const { log } = require("../library/internal.js");
const monitor = require('../services/MonitorTwitch.js')

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
