'use strict'

// this module expects to be invoked from within a discord
// ready event. do with that what you will.

export async function checkExisitingForumEvents (courseKey, courses, channelId, ChannelType, client) {

  // get the form channel object from discord
  const forum = await client.channels.fetch(channelId)

  if (forum.type === ChannelType.GuildForum) {

    // fetch active threads on channel
    const activeThreads = await forum.threads.fetchActive()
    
    // make sure ONLY bot posted threads are considered
    const userThreads = activeThreads.threads.filter((t) => t.ownerId === client.user.id)
    
    // [todo] : for each **event** in the **course calendar** compare each with
    // every **thread** in the given **course forum channel**. anything that
    // remains from the events is created as a new literal thread in the forum.

    // ...
    userThreads.forEach(async (thread) => {
      const starter = await thread.fetchStarterMessage()
      // if (starter.content.includes(courseKey)) {}
      console.log({thread, starter})


    })
  }
}
