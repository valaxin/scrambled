"use strict";

const { Events, EmbedBuilder } = require("discord.js");
const { keys, defaults } = require("../data/config.json");
const monitor = require("../services/MonitorTwitch.js");
const { creators } = require("../data/database.json");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    const guild = client.guilds.cache.get(keys.discord.guild);
    console.report(
      `[${client.user.username}#${client.user.discriminator}] > [${guild.id}]`,
      0
    );

    await monitor(client, 10000, creators || defaults.creators, () => {});
  },
};
