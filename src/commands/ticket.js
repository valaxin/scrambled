'use strict'

import {
  SlashCommandBuilder,
  ModalBuilder,
  LabelBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js'

import moment from 'moment'
import Ticket from '../database/models/Ticket.js'

const name = 'ticket'
const description = 'Create a new support ticket'
const data = new SlashCommandBuilder().setName(name).setDescription(description)

export default {
  data,
  async execute(interaction) {
    const modalCustomId = `${name}-modal-${interaction.id}`

    const categorySelect = new StringSelectMenuBuilder()
      .setCustomId(`${name}-category`)
      .setPlaceholder('Choose a category')
      .setRequired(true)
      .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('Support').setValue('bug').setDefault(true),
        new StringSelectMenuOptionBuilder().setLabel('Feature').setValue('feature'),
        new StringSelectMenuOptionBuilder().setLabel('General').setValue('general'),
        new StringSelectMenuOptionBuilder().setLabel('').setValue('general'),
      )

    const categoryLabel = new LabelBuilder().setLabel('Category').setStringSelectMenuComponent(categorySelect)

    const subjectInput = new TextInputBuilder()
      .setCustomId(`${name}-subject`)
      .setStyle(TextInputStyle.Short)
      .setRequired(true)

    const subjectLabel = new LabelBuilder().setLabel('Subject').setTextInputComponent(subjectInput)

    const dateInput = new TextInputBuilder()
      .setCustomId(`${name}-due-date`)
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('YYYY-MM-DD')
      .setMinLength(10)
      .setMaxLength(10)
      .setRequired(true)

    const dateLabel = new LabelBuilder()
      .setLabel('Due Date')
      .setDescription('Format: YYYY-MM-DD')
      .setTextInputComponent(dateInput)

    const bodyInput = new TextInputBuilder()
      .setCustomId(`${name}-body`)
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)

    const bodyLabel = new LabelBuilder().setLabel('Description').setTextInputComponent(bodyInput)

    const modal = new ModalBuilder()
      .setCustomId(modalCustomId)
      .setTitle('New Support Ticket')
      .addLabelComponents(categoryLabel, subjectLabel, dateLabel, bodyLabel)

    await interaction.showModal(modal)

    try {
      const submitted = await interaction.awaitModalSubmit({
        time: 300_000,
        filter: (i) => i.customId === modalCustomId && i.user.id === interaction.user.id,
      })

      const category = submitted.fields.getStringSelectValues(`${name}-category`)[0]
      const subject = submitted.fields.getTextInputValue(`${name}-subject`)
      const body = submitted.fields.getTextInputValue(`${name}-body`)
      const dueDateRaw = submitted.fields.getTextInputValue(`${name}-due-date`)
      const dueDate = moment(dueDateRaw, 'YYYY-MM-DD', true)

      await Ticket.create({
        user: interaction.user,
        guild: interaction.guild.id,
        duedate: dueDateRaw,
        catagory: category,
        subject: subject,
        body: body
      })

      const embed = new EmbedBuilder()
        .setTitle('New Ticket')
        .addFields(
          { name: 'Category', value: category, inline: false },
          { name: 'Subject', value: subject, inline: false },
          { name: 'Description', value: body, inline: false },
        )
      
        if (!dueDate.isValid()) {
          embed.addFields({
            content: `"${dueDateRaw}" is not a valid date. Use YYYY-MM-DD.`,
            flags: MessageFlags.Ephemeral,
          }
        )
      }
      
      await submitted.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
    } catch (error) {
      console.log(`oops! error with the ${name} command`, error)
    }
  },
}
