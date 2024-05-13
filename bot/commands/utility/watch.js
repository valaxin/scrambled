"use strict";

const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("watch")
    .setDescription("add a creator to the watch list")
    .addStringOption((option) =>
      option
        .setName("creator")
        .setDescription(
          "twitch username of the creator you wish to have go live notis for"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const options = {
        creator: interaction.options.getString("creator"),
      };

      const filepath = path.join(__dirname, "../../data/database.json");
      const db = await JSON.readLocalFileSync(filepath);
      db.creators.push(options.creator);
      await JSON.writeLocalFileSync(filepath, db);

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
