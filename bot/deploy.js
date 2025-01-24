'use strict'

import 'dotenv/config'
import * as url from 'url'
import { resolve } from 'node:path'
import { REST, Routes } from 'discord.js'
import { getCommands } from './helpers/get-commands.js'

const guild = process.env.WUMPUS_GUILD
const token = process.env.WUMPUS_TOKEN
const client = process.env.WUMPUS_CLIENT

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rest = new REST().setToken(token)

async function register(foldername) {
  try {
    const data = await getCommands(resolve(__dirname, foldername))
    const registered = await rest.put(Routes.applicationGuildCommands(client, guild), {
      body: data.commands,
    })
    console.log(`[discord] successfully registered ${registered.length} slash commands [${guild}]`)

    const output = {
      directory: { __dirname, foldername },
      success: true,
      len: registered.length,
      data,
      registered,
    }

    return output
  } catch (ex) {
    console.error('[discord] slash command registration error!', ex)
    const output = {
      ex,
      directory: { __dirname, foldername },
      success: true,
      len: registered.length,
      data,
      registered,
    }
    return output
  }
}

const reg = await register('commands')
