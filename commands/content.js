import pkgInfo from '../package.json' assert { type: 'json' }
import parsers from '../utilities/parser.js'

export const registration = {
  status: ':yellow_square:',
  name: 'content',
  description: 'Try and obtain a direct link for the given IMDB id'
}

export const projectInfoEmbedObject = async (data) => {

  let infoString = `"--"`

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
    },
    fields: [
      {
        name: `Uptime`,
        value: `${await parsers.readableProcUptime()}`
      },
      {
        name: `Information`,
        value: infoString
      }
    ]
  }
}

export const responses = async (interaction) => {
  let embeds = await projectInfoEmbedObject({ pkgInfo, interaction })
  let itData = await parsers.parseInteractionData(interaction)
  console.log(`${itData.user.full} issued "${itData.command.type}" "/${itData.command.name}" @ ${new Date().toUTCString()}`)
  interaction.reply({ embeds: [ embeds ], empheral: true })
}
