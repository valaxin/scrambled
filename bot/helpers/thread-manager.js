'use strict'

import moment from 'moment'

// this module expects to be invoked from within a discord
// ready event. do with that what you will.
export async function postNewThread (forum, options) {
  console.log('[postNewThread]', forum, options)
}

export async function checkExisitingForumEvents (courseKey, courses, channelId, ChannelType, client) {

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
    
    let threadCountExisting = 0
    let threadCountNew = 0
    let threadCountExpired = 0
    
    // for each BOT OWNED thread in channel
    botThreads.forEach(async (thread) => {
      // check the starting 
      const starter = await thread.fetchStarterMessage()
      for (const [evk, ev] of Object.entries(courses[courseObjectKey].events)) {
        
        if (!starter.content.includes(courseKey)) {
          // define time values (all epoch intergers)
          let eventStart = new Date(ev.start).getTime()
          let eventEnd = new Date(ev.end).getTime()
          let timeNow = new Date().getTime()

          // is same or after/before now
          const isoa = moment(eventStart).isSameOrAfter(timeNow)
          const isob = moment(eventStart).isSameOrBefore(timeNow)

          const { summary } = ev

          // doesn't have a thread and hasen't already happened
          if (isoa) {
            // console.log(`[discord] isSameOrAfter() => ${isoa} \n[discord] "This event hasn't occured yet."`)
            // console.log({
            //   courseKey,
            //   currentTime: moment(timeNow).format('LLLL'),
            //   eventSummary: summary,
            //   eventStarts: moment(eventEnd).format('LLLL'),
            //   eventFinishes: moment(eventStart).format('LLLL')
            // })
            threadCountNew++
            // make form thread for ? valid 🤞 event mayhaps
            console.log(` ${threadCountNew} -- should make new on ${courseObjectKey} forum`)
          }

          // no thread but already happened ...
          if (isob) {
            threadCountExpired++
          }
        
        // has thread
        } else {
          threadCountExisting++
        }
      }
      console.log(courseObjectKey, { threadCountExisting, threadCountNew, threadCountExpired })
    })
  }
}
