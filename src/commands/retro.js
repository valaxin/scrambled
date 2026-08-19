'use strict'

import 'dotenv/config'
import moment from 'moment'
import { resolve } from 'path'
import {
  SlashCommandBuilder,
  ModalBuilder,
  LabelBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js'
import { buildAuthorization, getUserRecentAchievements } from '@retroachievements/api'

import Achievements from '../database/models/Achievements.js'

const username = process.env.RA_USERNAME
const webApiKey = process.env.RA_API_KEY
const authentication = buildAuthorization({ username, webApiKey })

const name = 'retro'
const description = `setup notifications for retro achevements`
const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addSubcommand((register) => register.setName('register').setDescription('Register a new user for notifications'))
  .addSubcommand((list) => list.setName('list').setDescription('List of currently registered users'))
  .addSubcommand((games) => games.setName('games').setDescription('Games played by a user'))
  .addSubcommand((rm) => rm.setName('rm').setDescription('Remove a user from registration').addStringOption((strOpt => strOpt.setName('username').setDescription('username goes here'))))

export default {
  data,
  async execute(interaction) {
    try {
      const route = interaction.options._subcommand

      // !! handle different command routes

      if (route === 'register') {
        
        const modalCustomId = `${name}-modal-${interaction.id}`

        // string input elements
        const usernameInput = new TextInputBuilder()
          .setCustomId(`${name}-username`)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)

        const usernameLabel = new LabelBuilder()
          .setLabel('Username')
          .setDescription('Your RetroAchevements Username')
          .setTextInputComponent(usernameInput)

        // invoke literal modal element
        const modal = new ModalBuilder()
          .setCustomId(modalCustomId)
          .setTitle(' Setup')
          .addLabelComponents(usernameLabel)

        // show modal to user
        await interaction.showModal(modal)

        // submission handling
        const submitted = await interaction.awaitModalSubmit({
          time: 300_000,
          filter: (i) => i.customId === modalCustomId && i.user.id === interaction.user.id,
        })

        const user = submitted.fields.getTextInputValue(`${name}-username`)
        const options = { username: user, recentMinutes: 40320 } // 28 days
        const userRecentAchievements = await getUserRecentAchievements(authentication, options)
        const embed = new EmbedBuilder().setTitle('Retro Achevements Notifacations').setColor('Purple')

        try {

          // create new entry in database
          const newRetroUser = await Achievements.create({
            recently: userRecentAchievements,
            username: user,
            created: Date.now(),
            last: Date.now(),
          })

          console.log(newRetroUser)

          embed.addFields({ name: 'user', value: user, inline: false })
        } catch (error) {

          // user aware reject a duplicate user
          if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]
            embed.addFields({ name: 'message', value: `${user} is a duplicate`, inline: false })
          } else {
            throw error
          }
        }
        
        await submitted.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
      }

      if (route === 'list') {
        console.log(`[discord] /retro list"`)
        let users = await Achievements.find({ username: 1 })
        console.log(users)
      }

      if (route === 'games') {
        interaction.reply('not implimented')
      }
      
      if (route === 'rm') {
        // ...
        const canidate = interaction.options.getString('username')
        console.log(`[discord] ${Date.now()} asked to remove user "${canidate}"`)
        const resp = await User.deleteOne({ username: 'someUsername' });
        console.log(resp)

      }

      // throw new Error('Not Implimented')
    } catch (error) {
      console.error(error)
    }
  },
}
