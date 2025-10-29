'use strict'

// this module expects to be invoked from within a discord
// ready event. do with that what you will.
export async function postNewThread (forum, options) {
  console.log('[postNewThread]', forum, options)
}

export async function checkExisitingForumEvents (courseKey, courses, channelId, ChannelType, client) {


  // console.log(arguments)
  
  // get course information
  const courseObjectKey = courseKey.split('').splice(0, 4).join('').toLowerCase()
  const courseObject = courses[courseObjectKey]

  // get the form channel object from discord
  const forum = await client.channels.fetch(channelId)

  if (forum.type === ChannelType.GuildForum) {

    // fetch active threads on channel
    // make sure ONLY bot posted threads are considered
    const activeThreads = await forum.threads.fetchActive()
    const botThreads = activeThreads.threads.filter((t) => t.ownerId === client.user.id)
    
    let threadMatchCounter = 0
    
    // for each BOT OWNED thread in channel
    botThreads.forEach(async (thread) => {
      // check the starting 
      const starter = await thread.fetchStarterMessage()
      for (const [evk, ev] of Object.entries(courses[courseObjectKey].events)) {
        if (!starter.content.includes(courseKey)) {
          // console.log('no match!')

          // get event date?


          let current = new Date().getTime()
          let start = new Date(ev.start).getTime()
          let end = new Date(ev.end).getTime()
          
          // check time.
          if (start < current) {
            console.log(`[event] hasn't happened yet`)
          } else if (start > current) {
            console.log(`[event] already happening`)
          } else if (end > current) {
            console.log('[event] event over')
          }
          
          // const newThread = await forum.threads.create({ name: '', message: { content } })
        
        } else {
          threadMatchCounter++
          console.log(threadMatchCounter, 'match found')
        }
      }
    })
    console.log('matches', threadMatchCounter)
  }
}
