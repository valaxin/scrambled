import 'dotenv/config'
import ical from 'node-ical'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'

const cache = {
  
  // define truths
  courses: {
    prog: { key: 'prog', location: process.env.PROG, events: [], tagId: '' },
    webd: { key: 'webd', location: process.env.WEBD, events: [], tagId: '' },
    netw: { key: 'netw', location: process.env.NETW, events: [], tagId: process.env.NETW_TAGID },
    osys: { key: 'osys', location: process.env.OSYS, events: [], tagId: ''},
    dbas: { key: 'dbas', location: process.env.DBAS, events: [], tagId: ''},
  },

  // write JSON file
  write: async function (path, data) {
    try {
      // write Formatted JSON to disk,
      await writeFile(path, JSON.stringify(data, null, 2), 'utf8')
    } catch (err) {
      console.error('[discord] error writing json', err)
      throw err
    }
  },

  // read JSON file
  read: async function (path) {
    try {
      // get utf8 encoded content at provided path
      const content = await readFile(path, 'utf8')
      // return obtained JSON
      const jsondata = JSON.parse(content)
      return jsondata
    } catch (err) {
      // file not found, return null
      if (err.code === 'ENOENT') {
        return null
      }
      // otherwise...
      console.error('[discord] error reading json', err)
      throw err
    }
  },
}

const setup = () => {}

// provide calendar (-> object)
export async function calendar() {
  // ./temp/*.json
  const cachePath = resolve(process.env.BRIGHTSPACE_CACHE_PATH)
  
  // determine if there is a cache file (-> bool | error)
  const preExisting = existsSync(cachePath, (err) => {
    return err ? false : true
  })

  // todo: validate the incoming data before using...

  // define address + token
  const address = process.env.BRIGHTSPACE_CALENDAR_URL + process.env.BRIGHTSPACE_TOKEN
  // use cache if cache otherwise fetch data and make new cache
  const events = !preExisting ? await ical.async.fromURL(address) : await cache.read(cachePath)
  // above condition was false
  if (events && !preExisting) {
    // so we're gonna wanna write that to disk (needs error handling? -lol)
    await cache.write(cachePath, events)
    console.log(`[discord] successfully wrote cache file`)
  }

  // loop each course
  for (const [courseKey, course] of Object.entries(cache.courses)) {
    // ... then for each, loop each event
    for (const [eventKey, event] of Object.entries(events)) {
      // if location matches,
      if (event.location === course.location) {
        // push events to a corasponding key in the cache object.
        cache.courses[courseKey].events.push(event)
      }
    }
  }

  return cache
}
