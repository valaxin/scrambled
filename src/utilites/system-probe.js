'use strict'

import os from 'node:os'
import * as pkg from '../../package.json' with { type: 'json' }

export default async function probe() {
  try {
    const result = {
      system: {
        architecture: os.arch(),
        hostname: os.hostname(),
        platform: os.platform(),
        type: os.type(),
        uptime: os.uptime() || 'unknown',
      },
      host: {
        name: pkg.default.name,
        author: {
          username: pkg.default.author,
          profile: `https://github.com/${pkg.default.author}/`,
        },
        version: pkg.default.version,
        description: pkg.default.description,
        license: pkg.default.license,
        uptime: process.uptime() || 'unknown',
        repo: `https://github.com/${pkg.default.author}/${pkg.default.name}.git/`,
      },
    }

    return result
  } catch (error) {
    throw error
  }
}
