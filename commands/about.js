import Discord from 'discord.js'
import pkgInfo from '../package.json' assert { type: 'json' }

export const registration = {
  status: ':red_square:',
  name: 'about',
  description: 'Print information about this disord bot'
}

export const projectInfoEmbedObject = async (data) => {
  return {
    type: 'rich',
    title: data.pkgInfo.name,
    description: data.pkgInfo.description,
    version: data.pkgInfo.version,
    url: `${data.pkgInfo.author.url}/${data.pkgInfo.name}`,
    author: {
      name: data.pkgInfo.author.name,
      url: data.pkgInfo.author.url,
      icon_url: '',
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

  let embeds = await projectInfoEmbedObject({ pkgInfo })

  console.log(embeds)
  interaction.reply({
    embeds: [ embeds ],
    empheral: true
  })
}