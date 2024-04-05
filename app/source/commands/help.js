import pkgInfo from '../../../package.json' assert { type: 'json' }
import parsers from '../utilities/parser.js'
import { Client } from 'discord.js'
import client from '../../../index.js'

export const registration = {
  status: ':yellow_square:',
  name: 'help',
  description: 'Print command information to the chat.'
}

export const projectInfoEmbedObject = async (data) => {

  let infoString = `"--"`

  console.log(client.commands.size)

  const deo =  {
    type: 'rich',
    title: data.pkgInfo.name,
    description: data.pkgInfo.description,
    version: data.pkgInfo.version,
    url: `${data.pkgInfo.author.url}/${data.pkgInfo.name}`,
    fields: []
  }

  client.commands.forEach(command => {
    console.log(command.registration.name)
    console.log(command.registration.description)
    console.log(command.registration.status)

    deo.fields.push (
      {
        name: `**Command:** "/${command.registration.name}"`,
        value: `**Description:** ${command.registration.description}`
      }
    )

  })

  return deo
}

export const responses = async (interaction) => {
  let embeds = await projectInfoEmbedObject({ pkgInfo, interaction })
  let itData = await parsers.parseInteractionData(interaction)
  console.log(`${itData.user.full} issued "${itData.command.type}" "/${itData.command.name}" @ ${new Date().toUTCString()}`)
  interaction.reply({ embeds: [ embeds ], empheral: true })
}