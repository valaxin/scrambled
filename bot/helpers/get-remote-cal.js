import 'dotenv/config'
import ical from 'node-ical'
import { resolve } from 'path'
import { readFile, writeFile, accessSync, existsSync} from 'fs'

const data = 0
const cache = resolve(process.env.BRIGHTSPACE_CACHE_PATH)

// check for existing cache file
const exists = existsSync(cache, err => { return err ? false : true })

// request a new (updated) .ical file from brightspace
const createNewCache = async () => {
  const address = process.env.BRIGHTSPACE_CALENDAR_URL + process.env.BRIGHTSPACE_TOKEN
  const request = await fetch(address)
  const text = await request.text()
  const json = ical.sync.parseICS(text)
  return json
}

// format and write to disk

if (!exists) {
  createNewCache()
} else {
  console.log('exists')
}


export default {}