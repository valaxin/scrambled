#!/usr/bin node

'use strict'

import 'dotenv/config'
import * as url from 'url'
import { readdir } from 'fs/promises'
import { resolve } from 'path'
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import getCommands from './utilites/get-commands.js'
import connect from './database/connect.js'

/**
 * provide an IIFE responsible for starting a connection to discord's API.
 * - define our intents
 * - define our commands
 * - define our events
 * - make the connection
 * returns a client object
 */

export default (async () => {
  try {
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
    const client = new Client({ intents: [GatewayIntentBits.Guilds] })
    const collection = await getCommands(resolve(__dirname, 'commands'))

    client.commands = new Collection()

    for (const command of collection.files) {
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
        console.log(`[discord] "/${command.data.name}" ok!`)
      } else {
        console.warn(`[discord] The command is missing a required "data" or "execute" property.`)
      }
    }

    await connect()

    const eventsPath = resolve(__dirname, 'events')
    const eventsContent = await readdir(eventsPath)
    const eventsFiles = eventsContent.filter((file) => file.endsWith('.js'))

    for (const file of eventsFiles) {
      const filePath = resolve(eventsPath, file)
      const module = await import(filePath)
      const event = module.default
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
      } else {
        client.on(event.name, (...args) => event.execute(...args))
      }
    }

    client.login(process.env.WUMPUS_TOKEN)
    return client
  } catch (error) {
    return error
  }
})()
