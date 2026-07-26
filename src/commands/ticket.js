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

const name = 'ticket'
const description = 'create a new ticket'

const data = new SlashCommandBuilder().setName(name).setDescription(description)

export default {
  data,
  async execute(interaction) {
    const modalCustomId = `${name}-modal-${interaction.id}`

    const categorySelect = new StringSelectMenuBuilder()
      .setCustomId('ticket-category')
      .setPlaceholder('Choose a category')
      .setRequired(true)
      .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('Bug').setValue('bug'),
        new StringSelectMenuOptionBuilder().setLabel('Feature Request').setValue('feature'),
        new StringSelectMenuOptionBuilder().setLabel('General').setValue('general'),
      )

    const categoryLabel = new LabelBuilder()
      .setLabel('Category')
      .setStringSelectMenuComponent(categorySelect)

    const subjectInput = new TextInputBuilder()
      .setCustomId('ticket-subject')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)

    const subjectLabel = new LabelBuilder()
      .setLabel('Subject')
      .setTextInputComponent(subjectInput)

    const bodyInput = new TextInputBuilder()
      .setCustomId('ticket-body')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)

    const bodyLabel = new LabelBuilder()
      .setLabel('Description')
      .setTextInputComponent(bodyInput)

    const modal = new ModalBuilder()
      .setCustomId(modalCustomId)
      .setTitle('New Ticket')
      .addLabelComponents(categoryLabel, subjectLabel, bodyLabel)

    await interaction.showModal(modal)

    try {
      const submitted = await interaction.awaitModalSubmit({
        time: 300_000,
        filter: (i) => i.customId === modalCustomId && i.user.id === interaction.user.id,
      })

      const category = submitted.fields.getStringSelectValues('ticket-category')[0]
      const subject = submitted.fields.getTextInputValue('ticket-subject')
      const body = submitted.fields.getTextInputValue('ticket-body')

      const embed = new EmbedBuilder()
        .setTitle('New Ticket')
        .addFields(
          { name: 'Category', value: category, inline: false },
          { name: 'Subject', value: subject, inline: false },
          { name: 'Description', value: body, inline: false },
        )

      await submitted.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
    } catch (error) {
      console.log(`oops! error with the ${name} command`, error)
    }
  },
}