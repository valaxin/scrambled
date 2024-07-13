'use strict'

import 'dotenv/config'
import * as url from 'url'
import { readdir, lstat } from 'fs/promises'
import { resolve } from 'path'
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { getCommands } from './modules/get-commands.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const collection = await getCommands(resolve(__dirname, 'commands'))

client.commands = new Collection()

for (const command of collection.files) {
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(`> [discord] The command at ${filePath} is missing a required "data" or "execute" property.`)
  }
}

const eventsPath = resolve(__dirname, 'events')
const eventsContent = await readdir(eventsPath)
const eventsFiles = eventsContent.filter((file) => file.endsWith('.js'))

for (const file of eventsFiles) {
  const filePath = resolve(eventsPath, file)
  const module = await import(filePath)
  const event = module.default

  event.once
    ? client.once(event.name, (...args) => event.execute(...args))
    : client.on(event.name, (...args) => event.execute(...args))
}

client.login(process.env.WUMPUS_TOKEN)

export default client
