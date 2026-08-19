import { resolve } from 'node:path'
import { readdir, lstat } from 'fs/promises'

async function loadCommandFile(filePath) {
  try {
    const module = await import(filePath)
    const command = module.default
    
    if (!command || typeof command !== 'object') {
      throw new Error(`[discord] skipping ${filePath}: no command or command object`)
    }

    if (!('data' in command) || !('execute' in command)) {
      throw new Error(`[discord] skipping ${filePath}: missing required "data" or "execute" property`)
    }

    return command
  } catch (error) {
    return error
  }
}

async function scanDirectory(directory, target) {
  const entries = await readdir(directory)
  const paths = entries.map((entry) => resolve(directory, entry))

  for (const path of paths) {
    const stats = await lstat(path)

    if (!stats.isFile()) {
      console.warn(`[discord] ${path} is NOT file`)
    }

    if (!path.endsWith('.js')) {
      continue
    }

    const command = await loadCommandFile(path)

    if (!command) {
      console.warn('[discord] no command')
      continue
    }

    target.commands.push(command.data.toJSON())
    target.files.push(command)
  }
}

export default async function getCommands(directory) {
  try {
    const results = { commands: [], files: [] }
    await scanDirectory(directory, results)
    return results
  } catch (error) {
    return error
  }
}
