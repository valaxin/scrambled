import 'dotenv/config'
import ical from 'node-ical'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'

const cache = {
  courses: {
    prog: { key: 'prog', location: process.env.PROG, events: [] },
    webd: { key: 'webd', location: process.env.WEBD, events: [] },
    netw: { key: 'netw', location: process.env.NETW, events: [] },
    osys: { key: 'osys', location: process.env.OSYS, events: [] },
    dbas: { key: 'dbas', location: process.env.DBAS, events: [] },
  },
  write: async function (path, data) {
    try {
      await writeFile(path, JSON.stringify(data, null, 2), 'utf8')
    } catch (err) {
      console.error('[discord] error writing json', err)
      throw err
    }
  },
  read: async function (path) {
    try {
      const content = await readFile(path, 'utf8')
      return JSON.parse(content)
    } catch (err) {
      if (err.code === 'ENOENT') {
        // File doesn’t exist — return null or a default
        return null
      }
      console.error('Error reading cache file:', err)
      throw err
    }
  },
}

export async function calendar() {
  // -. define the path to the cache file, and determine if file exists already
  const cachePath = resolve(process.env.BRIGHTSPACE_CACHE_PATH)
  const preExisting = existsSync(cachePath, (err) => {
    return err ? false : true
  })

  // 1-a. fetch the calendar .ics file from remote source, (converts to json)
  // 1-b. use local (expected) json file
  const address = process.env.BRIGHTSPACE_CALENDAR_URL + process.env.BRIGHTSPACE_TOKEN
  const events = !preExisting ? await ical.async.fromURL(address) : await cache.read(cachePath)

  if (events && !preExisting) {
    console.log(`[discord] successfully wrote cache file`)
    await cache.write(cachePath, events)
  }

  // 2. map courses to events
  for (const [courseKey, course] of Object.entries(cache.courses)) {
    for (const [eventKey, event] of Object.entries(events)) {
      if (event.location === course.location) {
        cache.courses[courseKey].events.push(event)
      }
    }
  }

  console.log(`[discord] successful`)
  console.log(`[disocrd] cache preview`, cache)
  return cache
}
