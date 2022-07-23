import chalk from 'chalk'

export default {
  
  getUserFromMention: (mention, client) => {
    if (!mention) {
      return false
    }
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1)
      if (mention.startsWith('!')) {
        mention = mention.slice(1)
      }
      return client.users.cache.get(mention)
    }
  },

  SSBDownloadLink: link => {
    const chunks = link.split('/e/')
    return `${chunks[0]}/dl?op=download_orig&id=${chunks[1]}&mode=h`
  },

}

export const log = (color, message) => {
  let slug = '[discord.js]'
  try {
    if (message.includes(slug)) {
      console.log(chalk.magenta(slug) + chalk[color](message.split(slug)[1]))
    } else {
      console.log(chalk[color](message))
    }
  } catch (err) {
    chalk.red(err)
  }

}

export const streamLink = (streamSBLink) => {
  const chunks = link.split('/e/')
  return `${chunks[0]}/dl?op=download_orig&id=${chunks[1]}&mode=h`
}

export const stringToHexColor = (str) => {
  let hash = 0
  let color = '0x'
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF
    color += ('00' + value.toString(16)).substr(-2)
  }
  return Number(color)
}

export const shortenString = (limit, str) => {
  if (!limit)
    limit = 500
  if (str.length < limit) {
    return str
  } else {
    return str.substr(0, limit) + ' ...'
  }
}