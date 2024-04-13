const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const probe = require("../../support/probeSystem.js");

// server information, uptime,

// bot inforamtion,  uptime, commands, author/repo information

// connected guild information

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Information about the bot itself."),
  async execute(interaction) {
    try {

      const info = await probe()
      /*
      console.log(info)
      console.log(interaction.guild.name)
      console.log(interaction.guild.memberCount)
      console.log(interaction.user)
      */

      const meta = {
        guilds: []
      }

      const embed = new EmbedBuilder()
        .setColor(0xffe135)
        .setTitle(`**${info.host.name}@${info.host.version}**`)
        .setAuthor({ name: info.host.author.username, url: info.host.author.profile })
        .setDescription(info.host.description)
        .setURL(info.host.repo)
        .addFields(
          { 
            name: `${info.system.hostname}.local/${info.system.platform} [${info.system.architecture}] :: ${info.host.name}[${info.host.version}] \n`, 
            value: `\n **System Uptime:** \n > ${info.system.uptime.t.friendly} \n **Bot Uptime:** \n > ${info.host.uptime.t.friendly} \n`,
            inline: false
          }
        );

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (error) {
      console.error(error)
      return error;
    }
  },
};
