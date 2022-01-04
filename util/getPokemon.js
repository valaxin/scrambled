import fetch from 'node-fetch'

const dexEndpoint = `https://pokeapi.glitch.me/v1/pokemon/`
const gpssEndpoint = `https://flagbrew.org/api/v2/gpss/search/pokemon?page=1`

export const getPokemon = async (slug) => {
  let request = await fetch(dexEndpoint + slug)
  let data = await request.json()
  return data
}

export const getGPSSPokemon = async (species) => {

  let outgoingData = {
    mode: 'and',
    species: [ species ],
    legal: true,
    operators: [
      { 
        operator: 'IN',
        field:'species'
      }
    ],
    sort_field: 'legality',
    sort_direction: false
  }

  let request = await fetch(gpssEndpoint,
    {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(outgoingData),
      method: 'post'
    }
  )
  
  let results = await request.json()
  let result = {}

  for (let i = 0; results.pokemon.length -1; i++) {
    if (results.pokemon[i].pokemon.nickname == results.pokemon[i].pokemon.species && results.pokemon[i].pokemon.is_legal === true) {
      result = results.pokemon[i]
      break
    }
  }

  let src = `https://flagbrew.org/gpss/${result.download_code}`
  let hex = Buffer.from(result.base_64, 'base64')

  return { hex, src }

}