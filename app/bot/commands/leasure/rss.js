const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require('axios')

const sendRegistrationData = async (url, data) => {
  try {
    const request = await axios.post(url, data)
    return request
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rss")
    .setDescription("Setup an RSS subscription")
    .addStringOption((option) => {
      return option
        .setName('feed')
        .setDescription('Address for the desired RSS feed.')
        .setRequired(true)
      })
    .addNumberOption((option) => {
      return option
        .setName('interval')
        .setDescription('How often should we alert you to this content?')
        .setRequired(false)
        .setChoices(
          { name: '1 hour', value: 60, },
          { name: '4 hours', value: 240, },
          { name: '1 daily', value: 1440, },
          { name: '1 minute', value: 1, },
        )
    }),
  async execute(interaction) {
    try {
      const payload = {
        address: interaction.options.getString('feed'),
        interval: interaction.options.getNumber('interval'),
        owner: `${interaction.user.username}@${interaction.guild.id}`
      }
      console.log(interaction.options, payload);
      const endpoint = `http://localhost:3000/api/subscriptions/create`
      const reqConf = await sendRegistrationData(endpoint, payload)
      console.log(reqConf)
      await interaction.reply("bingo");
    } catch (error) {
      console.log(error)
      throw error
    }
  },
};
  