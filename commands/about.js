import pkgInfo from '../package.json' assert { type: 'json' }

export const registration = {
  status: ':yellow_square:',
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

export const responses = async (interaction) => {
  let embeds = await projectInfoEmbedObject({ pkgInfo })
  interaction.reply({ embeds: [ embeds ], empheral: true })
}
