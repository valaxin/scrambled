import fetch from 'node-fetch'

const endpoint = `https://pokeapi.glitch.me/v1/pokemon/`

export const getPokemon = async (slug) => {
  let request = await fetch(endpoint + slug)
  let data = await request.json()
  return data
}