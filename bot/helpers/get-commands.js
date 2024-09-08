import { resolve } from 'node:path'
import { readdir, lstat } from 'fs/promises'

export async function getCommands(directory) {
  const commands = []
  const files = []

  try {
    // grab the contents of the commands folder
    const folderContent = await readdir(directory)
    const contentPaths = folderContent.map((file) => resolve(directory, file))

    // iterate over its contents
    for (const path of contentPaths) {
      const stats = await lstat(path)

      // if we encounter another directory check...
      if (stats.isDirectory()) {
        const subFolderContent = await readdir(path)
        const subContentPaths = subFolderContent.map((file) => resolve(path, file))

        // ...for and import only js files
        for (const subpath of subContentPaths) {
          if (subpath.endsWith('.js')) {
            const module = await import(subpath)

            if ('data' in module.default && 'execute' in module.default) {
              commands.push(module.default.data.toJSON())
              files.push(module.default)
            } else {
              console.warn(`[discord] the command at ${filePath} is missing a required "data" or "execute" property`)
            }
          }
        }
      }

      // ... it's a javascript file
      if (stats.isFile() && path.endsWith('.js')) {
        const module = await import(path)

        if ('data' in module.default && 'execute' in module.default) {
          commands.push(module.default.data.toJSON())
          files.push(module.default)
        } else {
          console.warn(`[discord] the command at ${filePath} is missing a required "data" or "execute" property`)
        }
      }
    }

    return { commands, files }
  } catch (ex) {
    console.error(`[discord] error occured processing command files`, ex)
    return ex
  }
}
