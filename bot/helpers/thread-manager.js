'use strict'

import moment from 'moment'

// this module expects to be invoked from within a discord
// ready event. do with that what you will.
export async function postNewThread(forum, options) {
  console.log('[postNewThread]', forum, options)
}

export async function checkExisitingForumEvents(courseKey, courses, channelId, ChannelType, client) {
  const courseObjectKey = courseKey.split('').splice(0, 4).join('').toLowerCase()
  const courseObject = courses[courseObjectKey]
  const forum = await client.channels.fetch(channelId)

  // console.log(forum.type, ChannelType.GuildForum)

  if (forum.type === ChannelType.GuildForum) {
    // fetch active threads on channel
    // make sure ONLY bot posted threads are considered
    let activeThreads = await forum.threads.fetchActive()
    let botThreads = activeThreads.threads.filter((t) => t.ownerId === client.user.id)

    let threadCountNew = 0
    let threadCountExisting = 0
    let threadCountExpired = 0

    // take in all and group simliar
    const assignmentGroup = (str) => {
      let types = ['- Due', '- Available', '- Availability Ends']
      let title = str.includes('-') ? str.split('-')[0] : null
      
      // console.log(title)
      // for (const term of types) {
      //   let i = 0
      //   if (str.includes(term) && str.includes(title)) {
      //     i++
      //     console.log(`${title} - "${term}" GROUP (${i})`)
      //   }
      // }
      return { title, types }
    }

    const eventId = (event) => {
      return false
    }

    // for every bot "owned" thread in forum channel
    botThreads.forEach(async (thread) => {
      const starter = await thread.fetchStarterMessage() // first thread in forum channel

      // each one of these suckers!
      for (const [evk, ev] of Object.entries(courses[courseObjectKey].events)) {
        const now = new Date().getTime()
        const { summary, description, location, start, end } = ev
        const isoa = moment(new Date(start).getTime()).isSameOrAfter(now)
        const isob = moment(new Date(start).getTime()).isSameOrBefore(now)

        // side-quest : let's construct a simple ID for a given event.
        // for this I fancy a neat little unique value
        
        if (starter.content.includes(`enabled=true`)) {
          // console.log(`${courseObjectKey} :: ENABLED`)
        }

        if (isoa) {
          console.log(`NO THREAD AND HAS NOT HAPPENED`)
          let ag = assignmentGroup(summary)
          console.log({ag})
          threadCountNew++
        }

        // about to end or has already ended events
        if (isob) {
          threadCountExpired++
        }
        
        /*
        if (!starter.content.includes(courseKey)) {
          // console.log({ev})

          // is same or after/before now
          const now = new Date().getTime()
          const { summary, description, location, start, end } = ev
          const isoa = moment(new Date(start).getTime()).isSameOrAfter(now)
          const isob = moment(new Date(start).getTime()).isSameOrBefore(now)

          // doesn't have a thread and hasen't already happened
          if (isoa ) {
            threadCountNew++
            // make form thread for ? valid 🤞 event mayhaps
            // console.log(`\n[discord] should be creating "this" new thread for ${courseObjectKey}`)
            // console.log({ start, summary, location }, `\n`)
            
            // we need to handle a group of the same events, broken up by
            // '%title% - Due'
            // '%title% - Available'
            // '%title% - Availability Ends'
            // if we're gonna group, we need to combine the start times.

            // await forum.threads.create({
              // name: `[${courseObjectKey.toUpperCase()}] - ${summary}`,
              // message: { content: `## ${courseKey}\n\n### ${summary}\n\n${description || ''}`,  },
            // })
          // no thread but already happened ...
          } else if (isob) {
            threadCountExpired++
          }
        // has thread already...
        } else {

          threadCountExisting++
        }
          */
      }
      console.log(courseObjectKey, { threadCountExisting, threadCountNew, threadCountExpired })
    })
  }
}
