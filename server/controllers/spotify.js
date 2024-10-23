'use strict'

import 'dotenv/config'

// == Helper Request Function ==
async function requestSongData(token) {
  try {
    let options = { headers: { Authorization: `Bearer ${token}` } }
    let endpoint = process.env.SPOTIFY_NOWPLAYING_ENDPOINT
    let spotifysResponse = await fetch(endpoint, options)
    if (spotifysResponse.status > 400) {
      throw new Error(`[express] ${spotifysResponse.status} | ${spotifysResponse.statusText}`)
    }
    if (spotifysResponse.status === 204) {
      return {
        status: spotifysResponse.status,
        is_playing: false,
      }
    }
    let song = await spotifysResponse.json()
    let parsedResponse = {
      url: spotifysResponse.url,
      status: spotifysResponse.status,
      method: spotifysResponse.method,
      song: {
        title: song.item.name,
        artist: song.item.artists.map((artist) => artist.name).join(', '),
        album: song.item.album.name,
      },
      is_playing: song.is_playing,
      progress_ms: song.progress_ms,
      duration_ms: song.item.duration_ms,
    }
    return parsedResponse
  } catch (error) {
    console.error(`[express/spotify.js]`, error)
    res.sendStatus(500)
    return error
  }
}

// == Exported Express Middleware ==
export default async function nowPlaying(req, res, next) {
  try {
    req.spotify.songdata = await requestSongData(req.spotify.access_token)
    if (req.query.data === 'true') {
      res.json(req.spotify.songdata)
    } else {
      res.sendStatus(200)
    }
  } catch (ex) {
    console.error(ex)
    res.sendStatus(500)
  }
}
