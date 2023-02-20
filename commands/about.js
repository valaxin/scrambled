import pkgInfo from '../package.json' assert { type: 'json' }
import parsers from '../utilities/parsers.js'

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
  let itData = await parsers.parseInteractionData(interaction)
  console.log(`${itData.user.full} issued "${itData.command.type}" "/${itData.command.name}" @ ${new Date().toUTCString()}`)
  interaction.reply({ embeds: [ embeds ], empheral: true })
}
