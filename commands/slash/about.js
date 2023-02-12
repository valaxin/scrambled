import Discord from 'discord.js'
import pkgInfo from '../../package.json' assert { type: 'json' }
import { ghUserData } from '../../utilities/helpers'

export const registration = {
  status: ':red_square:',
  name: 'about',
  description: 'Prints this bot\'s "about" information'
}

export const manifestEmbeds = async (data) => {
  return {
    type: 'rich',
    title: data.name,
    description: data.description,
    url: `https://github.com/repo/${data.name}`,
    author: {
      name: data.author.name,
      url: data.author.url,
      icon_url: userData.avatar_url,
    }
  }
}

/*
  name: '',
  description: '~',
  version: '0.0.3',
  main: 'index.js',
  license: 'MIT',
  author: { name: 'valaxin', url: 'https://github.com/valaxin' },
  bugs: { url: 'https://github.com/valaxin/scrambled/issues' },
*/


export const responses = async (interaction) => {

  let userData = await ghUserData(pkgInfo.author.name)
  let embeds = await manifestEmbeds({ pkgInfo, userData })

  console.log(embeds)

  interaction.reply({
    embeds: [ embeds ],
    empheral: true
  })
}