"use strict";

const { Events, EmbedBuilder } = require("discord.js");
const { keys, defaults } = require("../data/config.json");
const monitor = require('../services/MonitorTwitch.js');

// lazy get?
const { creators } = require('../data/database.json')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    const guild = client.guilds.cache.get(keys.discord.guild)
    console.report(
      `[${client.user.username}#${client.user.discriminator}] > [${guild.id}]`,
      0
    );

    // isolate the default channel and guild objects for later use by workers...
    // const channel = client.channels.cache.get(keys.discord.channels.default)
    // example: await worker ({ channel, guild, client, embed: Embedbuilder, log })

    // ... ?

    await monitor(client, 5000, creators || defaults.creators, () => {})

  },
};
