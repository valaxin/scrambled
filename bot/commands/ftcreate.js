import 'dotenv/config'
import { SlashCommandBuilder, ChannelType, PermissionFlagsBits } from 'discord.js'

const name = 'ftcreate'
const description = 'Create a single new thread within the set forum channel.'

// Take "Title" and "Content" and create one simple forum thread
// Expected invocation is from within a discord interaction. 
export const createOneNewForumThread = async (interaction) => {
  
  // Retrieve user inputs from the slash command.
  const title = interaction.options.getString('title')
  const content = interaction.options.getString('content')

  // ID of the target forum channel.
  const forumChannelId = process.env.WUMPUS_FORUM_CHANNEL

  // Fetch the forum channel from cache.
  const forum = interaction.client.channels.cache.get(forumChannelId)

  // Validate channel type before proceeding.
  if (!forum || forum.type !== ChannelType.GuildForum) {
    console.log(forum)
    await interaction.reply({ content: 'Forum channel not found or invalid.', ephemeral: true })
    return
  }

  // Create a new thread in the forum with an initial message.
  const thread = await forum.threads.create({
    name: title,
    message: { content },
  })

  // Reply with confirmation and link to the new thread.
  await interaction.reply(`Thread created: ${thread.toString()}`)
}

// Setup command
const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addStringOption((option) => option.setName('title').setDescription('Title of content').setRequired(true))
  .addStringOption((option) => option.setName('content').setDescription('Initial message content').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)

// provide
export default {
  data,
  async execute(interaction) {
    await createOneNewForumThread(interaction)
  },
}
