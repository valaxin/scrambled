import { getPokemon } from '../util/getPokemon.js'

const generations = [ 'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar' ]

export default {
	name: 'pkmn',
	description: 'Get pokedex data for a given pokemon.',
  arguments: '<NationalDexNumber|Name>',
	status: ':yellow_square:',
	execute: async (message, options) => {

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
          text: `pokedevs.gitbook.io/pokedex/`,
          icon_url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-LLCxzBmWEaED20k4rae%2Favatar.png?generation=1535685166706558&alt=media`
        }
      }
    ]

		message.channel.send({ embeds })
	},
}