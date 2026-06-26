import { resolve } from 'node:path'
import { readdir, lstat } from 'fs/promises'

export async function getCommands (directory) {
  const commands = []
  const files = []

  try {
    // fetch the contents of directory and begin
    // iterating over the entries.
    const folderContent = await readdir(directory)
    const contentPaths = folderContent.map((file) => resolve(directory, file))
    for (const path of contentPaths) {

      // each files stats
      const stats = await lstat(path)

      // if we encounter a directory check content
      if (stats.isDirectory()) {
        const subFolderContent = await readdir(path)
        const subContentPaths = subFolderContent.map((file) => resolve(path, file))
        for (const subpath of subContentPaths) {
          if (subpath.endsWith('.js')) {
            const module = await import(subpath)
            
            // check that imported file has proper exports
            if ('data' in module.default && 'execute' in module.default) {
              commands.push(module.default.data.toJSON())
              files.push(module.default)
            } else {
              throw new Error(`[discord] the command at ${filePath} is missing a required "data" or "execute" property`)
            }
          }
        }
      }

      // not a sub directory,
      // check the each javascript file for the correct exports
      if (stats.isFile() && path.endsWith('.js')) {
        const module = await import(path)
        if ('data' in module.default && 'execute' in module.default) {
          commands.push(module.default.data.toJSON())
          files.push(module.default)
        } else {
          throw new Error(`[discord] the command at ${filePath} is missing a required "data" or "execute" property`)
        }
      }
    }
    return { commands, files }
  } catch (error) {
    return new Error(`[discord] error occured processing command files`, error)
  }
}
