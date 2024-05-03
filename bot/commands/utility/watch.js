"use strict";

const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const path = require("node:path");
const { exists } = require("../../library/internal.js");
const store = require('../../library/storage.js')
const data = exists(__filename);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(data.name)
    .setDescription(data.command.description)
    .addStringOption((option) =>
      option
        .setName(data.arguments[0])
        .setDescription(data.command.arguments[data.arguments[0]].description)
        .setRequired(data.command.arguments[data.arguments[0]].required)
    ),
  async execute(interaction) {
    try {
      const options = {
        creator:
          interaction.options.getString(data.arguments[0]) ||
          data.command.arguments[data.arguments[0]].default,
      };

      console.log(options)

      // r/w on _databse.json

      const filepath = path.join(__dirname, '../../support/_database.json')
      const db = await store.read(filepath)
      db.creators.push(options.creator)
      await store.write(filepath, db)

      await interaction.reply({
        content: "something",
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
