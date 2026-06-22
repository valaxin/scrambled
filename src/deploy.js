'use strict'

import 'dotenv/config'
import * as url from 'url'
import { resolve } from 'node:path'
import { REST, Routes } from 'discord.js'
import { getCommands } from './utilites/get-commands.js'

// locals
const guild = process.env.WUMPUS_GUILD
const token = process.env.WUMPUS_TOKEN
const client = process.env.WUMPUS_CLIENT

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rest = new REST().setToken(token)

/**
 * register slash commands with discord api
 */

async function register(foldername) {
  try {
    // get commands from folder using helper function
    const data = await getCommands(resolve(__dirname, foldername))
    console.log(`[discord] Attempting to register ${data.commands.length} slash commands to [${guild}]!`)
    const registered = await rest.put(Routes.applicationGuildCommands(client, guild), { body: data.commands })
    console.log(`[discord] Successfully ${registered.length} slash commands to [${guild}]!`)

    // returns a data object
    return {
      successful: true,
      total: registered.length,
      outgoing: data,
      incoming: registered,
    }

  } catch (error) {
    return new Error(`[discord] Slash command registration error.`, error)
  }
}

await register('commands')