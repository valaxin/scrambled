import 'dotenv/config'
import ical from 'node-ical'
import { resolve } from 'path'
import { readFile, writeFile, existsSync } from 'fs'

const data = 0
// define cache path and check for existing cache file
const cachePath = resolve(process.env.BRIGHTSPACE_CACHE_PATH)
const prexisting = existsSync(cachePath, err => { return err ? false : true })

// request a new (updated) .ical file from brightspace
export const fetchAndCreateNewLocalCache = async () => {
  const address = process.env.BRIGHTSPACE_CALENDAR_URL + process.env.BRIGHTSPACE_TOKEN
  const request = await fetch(address)
  const text = await request.text()
  const json = ical.sync.parseICS(text)
  await writeLocalCache(cachePath, JSON.stringify(json))
  return json
}

// write the data to disc?disk/... cause why not 🤷‍♂️
// -- honestly which is it?
export const writeLocalCache = async (path, data) => {
  try {
    await writeFile(path, data, { encoding: 'utf-8' }, (err) => {
      if (!err) {
        console.log('writing cache successfully!')
        return true
      } else {
        throw err
      }
    })
  } catch (err) {
    return new Error(`[.bot/helpers/get-remote-cal.js::writeLocalCache()] - Error Writing`, err)
  }
}

// read from disk
export const readLocalCache = async (path) => {
  try {
    const cachedDocument = await readFile(path, (err, data) => {
      if (!err) {
        console.log('[discord] reading local calendar data!')
        console.log(data)
      } else {
        console.error(err)
      }
    })
    return cachedDocument
  } catch (err) {
    return new Error(`[.bot/helpers/get-remote-cal.js::readLocalCache()] - Error Reading`, err)
  }
}

export const calendarHandler = async () => {
  if (!prexisting) {
    await fetchAndCreateNewLocalCache()
  } else {
    const cacheData = await readLocalCache(cachePath)
    console.log(cacheData)
  }
}