import { getPokemon, getGPSSPokemon } from '../util/getPokemon.js'
import path from 'path'
import fs from 'fs'

const generations = [ 'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar' ]

export default {
	name: 'pkmn',
	description: 'Get pokedex data for a given pokemon.',
  arguments: '<NationalDexNumber|Name>',
	status: ':yellow_square:',
	execute: async (message, options) => {

    message.channel.sendTyping()
    let pokemonArray = await getPokemon(options[0])
    let pokemon = pokemonArray[0]

    let types = () => {
      let str = ''
      pokemon.types.forEach(type => {
        str += `${type}, `
      })
      return str
    }

    let generation = () => { return generations[pokemon.gen -1] }
    
    let embeds = [
      {
        type: 'rich',
        title: pokemon.name,
        description: `No. ${pokemon.number}`,
        color: 0xd9201d,
        fields: [
          {
            name: `Description:`,
            value: pokemon.description,
            inline: true
          },
          {
            name: `Types:`,
            value: types()
          },
          {
            name: `Height / Width:`,
            value: `${pokemon.height} / ${pokemon.weight}`
          },
          {
            name: `Generation:`,
            value: generation(),
            inline: true
          }
        ],
        image: {
          url: pokemon.sprite,
          height: 0,
          width: 0
        },
        footer: {
          text: `${pokemon.name} hex`,
          icon_url: `attachment://${pokemon.name}`
        }
      }
    ]

    if (options[1] === 'gethex') {
      let hexData = await getGPSSPokemon(pokemon.name)
      console.log(hexData)
      let filename = path.resolve('./temp', `${pokemon.name}`)
      console.log(filename)
      fs.writeFile(filename, hexData, 'hex', (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`${filename} ~ saved`)
        }
      })
    }

		// message.channel.send({ embeds })

    console.log(message.attachments.values())
    message.channel.send({ files: [], content: 'penis' })

	},
}