// Command: create-thread
// Purpose: Create a new thread in a designated forum channel using slash commands.

import 'dotenv/config'
import { SlashCommandBuilder, ChannelType, PermissionFlagsBits } from 'discord.js'

const name = 'fpcreate'
const description = 'create a single new post within the set forum channel'

// const embed = new EmbedBuilder().setTitle(name).setDescription(description)

// given title and content, create a new discord forum post
// we assume access to 'interaction'
const createNewForumPost = async interaction => {

    // Retrieve user inputs from the slash command
    const title = interaction.options.getString('title')
    const content = interaction.options.getString('content')

    // ID of the target forum channel
    const forumChannelId = process.env.WUMPUS_FORUM_CHANNEL

    // Fetch the forum channel from cache
    const forum = interaction.client.channels.cache.get(forumChannelId)

    // Validate channel type before proceeding
    if (!forum || forum.type !== ChannelType.GuildForum) {
      console.log(forum)
      await interaction.reply({ content: 'Forum channel not found or invalid.', ephemeral: true })
      return
    }

    // Create a new thread in the forum with an initial message
    const thread = await forum.threads.create({
      name: title,
      message: { content },
    })
      // Reply with confirmation and link to the new thread
    await interaction.reply(`Thread created: ${thread.toString()}`)
}
 
const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addStringOption((option) => option.setName('title').setDescription('Title of content').setRequired(true))
  .addStringOption((option) => option.setName('content').setDescription('Initial message content').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)

export default {
  data,
  async execute(interaction) {
    await createNewForumPost(interaction)
  },
}
