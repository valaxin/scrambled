'use strict'

import 'dotenv/config'
import { REST, Routes } from 'discord.js'

try {
  const rest = new REST().setToken(process.env.WUMPUS_TOKEN)
  await rest.put(Routes.applicationGuildCommands(process.env.WUMPUS_CLIENT, process.env.WUMPUS_GUILD), { body: [] })
  await rest.put(Routes.applicationCommands(process.env.WUMPUS_CLIENT), { body: [] })
  console.log('Sucessfully removed application slash commands')
} catch (ex) {
  console.error(ex)
}
