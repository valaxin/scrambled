import fetch from 'node-fetch'

// auth with "twitch.tv" to obtain bearer tokens
export const authenticateTwitch = async (id, secret) => {
  if (!id || !secret) return false
  let query = `?client_id=${id}&client_secret=${secret}&grant_type=client_credentials&scope`
  let endpoint = `https://id.twitch.tv/oauth2/token${query}`
  let reqPermission = await fetch(endpoint, { method: 'POST' })
  let tokens = await reqPermission.json()
  return [tokens, id]
}

// active query of a given user(s) twitch account on a given interval for "GO LIVE" status
export const queryForBroadcastStatus = async (username, tokens) => {
  try {
    let address = `https://api.twitch.tv/helix/streams?user_login=${username}`
    let requestStatus = await fetch(address, {
      headers: {
        'Client-Id': tokens[1],
        'Authorization': `Bearer ${tokens[0].access_token}`
      }
    })
    return requestStatus.json()
  } catch (err) {
    return new Error(err)
  }
}
