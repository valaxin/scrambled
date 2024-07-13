'use strict'

import 'dotenv/config'
import app from '../app.js'

async function getSpotifyNowPlaying(token) {
  try {
    const nowplayingEndpoint = process.env.SPOTIFY_NOWPLAYING_ENDPOINT
    const response = await fetch(nowplayingEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status > 400) {
      throw new Error('an error has occured, unable to Fetch Song')
    } else if (response.status === 204) {
      throw new Error('successful, nothing currently playing')
    }

    const song = await response.json()
    const albumImageUrl = song.item.album.images[0].url
    const artist = song.item.artists.map((artist) => artist.name).join(', ')
    const isPlaying = song.is_playing
    const songUrl = song.item.external_urls.spotify
    const title = song.item.name
    const timePlayed = song.progress_ms
    const timeTotal = song.item.duration_ms
    const artistUrl = song.item.album.artists[0].external_urls.spotify

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      timePlayed,
      timeTotal,
      artistUrl,
    }
  } catch (ex) {
    console.error('error fetching currently playing song: ', ex)
    return ex.message.toString()
  }
}

export default async function (req, res, next) {
  try {
    const data = await getSpotifyNowPlaying(req.spotify.access_token)
    app.io.emit('now-playing', data)
    res.json({ emit: 'now-playing', token: true, data })
  } catch (ex) {
    console.error('nowplaying middleware has encounted an error: ', ex)
    res.send(500)
  }
}
