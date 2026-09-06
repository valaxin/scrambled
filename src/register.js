#!/usr/bin node

'use strict'

import 'dotenv/config'
import * as url from 'url'
import { resolve } from 'node:path'
import { REST, Routes } from 'discord.js'
import getCommands from './utilites/get-commands.js'

const guild = process.env.WUMPUS_GUILD
const token = process.env.WUMPUS_TOKEN
const client = process.env.WUMPUS_CLIENT

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const rest = new REST().setToken(token)

console.log(`Attempting to register commands with Discord's API`)

if (guild && token && client) {
  console.log(`[discord] Tokens... OKAY!`)
}

console.log(`[discord] Working from ${__dirname}`)

async function register(directory) {
  try {
    const data = await getCommands(resolve(__dirname, directory))
    console.log(`[discord] getCommands(${__dirname}${directory})`, { data })
    console.log(`[discord] Attempting to register ${data.commands.length} slash commands to [${guild}]!`)

    const registered = await rest.put(Routes.applicationGuildCommands(client, guild), { body: data.commands })

    const info = {
      successful: true || false,
      total: registered?.length || 0,
      outgoing: data || {},
      incoming: registered || false,
    }

    console.log(`[discord] Successfully ${registered.length} slash commands to [${guild}]!`)
    console.log(`[discord] \n`, { info })

    return info
  } catch (error) {
    console.error(error)
  }
}

const registration = await register('commands')

console.log({ registration })
