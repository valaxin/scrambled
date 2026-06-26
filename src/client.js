'use strict'

// handle imports
import 'dotenv/config'
import * as url from 'url'
import { readdir, lstat } from 'fs/promises'
import { resolve } from 'path'
import { Client, Collection, GatewayIntentBits, Presence } from 'discord.js'

// func for ingesting commmands en mass
import { getCommands } from './utilites/get-commands.js'

// wrapped in self calling anonymous func, returns discord client object
export default (async () => {
  try {
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url))    // get working directory
    const client = new Client({ intents: [GatewayIntentBits.Guilds] })    // define new Discord client
    const collection = await getCommands(resolve(__dirname, 'commands'))  // define new collection as collection of commands
    client.commands = new Collection()
    for (const command of collection.files) {           // iterate over command files found
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command) // set into object...
      } else {
        console.log(`[discord] The command at ${filePath} is missing a required "data" or "execute" property.`)
      }
    }

    const eventsPath = resolve(__dirname, 'events')
    const eventsContent = await readdir(eventsPath)
    const eventsFiles = eventsContent.filter((file) => file.endsWith('.js'))

    for (const file of eventsFiles) {
      const filePath = resolve(eventsPath, file)
      const module = await import(filePath)
      const event = module.default

      // only once
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
      } else {
        client.on(event.name, (...args) => event.execute(...args))
      }
    }
    
    client.login(process.env.WUMPUS_TOKEN)
    return client
  } catch (error) {
    console.log(error)
    return error
  }
})()


