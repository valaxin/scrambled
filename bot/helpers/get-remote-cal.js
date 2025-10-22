// fetch the remote source that is the .ics file

// ... if no cache save new cache

// if cache, fetch new and get diff

// ... if diff update cache

// node-ical should return a json object of events.

// parse these events into requests for 'jimbo' to create a thread in the
// relevent class forum channel.

// modulize this to run as cron job, every hour or manually as bot command

import 'dot/env'
import ical from 'node-ical'

export default calendar = async () => {
  console.log('Starting .isc obtainment ...')
  const url = process.env.BRIGHTSPACE_CALENDAR_URL + process.env.BRIGHTSPACE_TOKEN
  const calRequest = await fetch(url, { method: 'GET' })
  const text = await calRequest.text()


  
  console.log('Parsing ical data into json')
  const calendar = ical.sync.parseICS(text)
  const events = Object.values(calendar).filter((e) => e.type === 'VEVENT')
  
  const itprog = Object.values(calendar).filter((e) => e.location.includes(process.env.ITPROG1700))

  console.log({ itprog })
}
