import fetch from 'node-fetch'

// auth with "twitch.tv" to obtain bearer tokens
export const authenticateTwitch = async (id, secret) => {
  if (!id || !secret) return false
  let query = `?client_id=${id}&client_secret=${secret}&grant_type=client_credentials&scope`
  let endpoint = `https://id.twitch.tv/oauth2/token${query}`
  let response = await fetch(endpoint, { method: 'POST' })
  let tokens = await response.json()
  return [tokens, id]
}

// GET - Query of a given user(s) twitch account for "GO LIVE" status
export const queryForBroadcastStatus = async (username, tokens) => {
  try {
    let endpoint = `https://api.twitch.tv/helix/streams?user_login=${username}`
    let response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokens[0].access_token}`,
        'Client-Id': tokens[1]
      }
    })
    return response.json()
  } catch (err) {
    return new Error(err)
  }
}

// GET - Query for user information related to provided username value
export const queryForUserId = async (username, tokens) => {
  try {
    let endpoint = `https://api.twitch.tv/helix/users?login=${username}`
    let response = await fetch (endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokens[0].access_token}`,
        'Client-Id': tokens[1]
      }
    })
    return response.json()
  } catch (err) {
    return new Error(err)
  }
}

// GET - List existing subscription JSON data, query this dataset to make sure we're not making duplicates
export const listSubscriptions = async (username, tokens) => {
  try {
    let endpoint = 'https://api.twitch.tv/helix/eventsub/subscriptions?status=enabled'
    let headers = {
      'Authorization': `Bearer ${tokens[0].access_token}`,
      'Client-Id': tokens[1]
    }
    let response = await fetch (endpoint, { method: 'GET', headers: headers })
    return response.json()
  } catch (err) {
    return new Error(err)
  }
}

// POST - create a new subscription
export const createNewSubscription = async (twitchUserId, eventType, tokens) => {
  let endpoint = `https://api.twitch.tv/helix/eventsub/subscriptions`
  let data = {
    type: eventType,
    version: 1,
    condition: {
      broadcaster_user_id: twitchUserId
    },
    transport: {
      method: 'webhook',
      callback: '',
      secret: config.keys.twitch.subscription_secret
    }
  }
  let headers = {
    'Authorization': `Bearer ${tokens[0].access_token}`,
    'Client-Id': tokens[1]
  }
  let response = await fetch (endpoint, { method: 'POST', headers: headers, json: data })
  return response.json()
}
