'use strict'

import 'dotenv/config'
import app from '../app.js'

async function songInformationFromSpotify(token) {
  try {
    const endpoint = process.env.SPOTIFY_NOWPLAYING_ENDPOINT
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status > 400) {
      throw new Error('[express] an error has occured, unable to fetch now playing info')
    }

    if (response.status === 204) {
      return { status: response.status, data: 'nothing playing' }
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
    const album = song.item.album.name

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      timePlayed,
      timeTotal,
      artistUrl,
      album,
    }
  } catch (error) {
    return false
  }
}

export default async function (req, res, next) {
  try {
    const data = await songInformationFromSpotify(req.spotify.access_token)
    app.io.emit('display-song', data)

    // if the request for song information is coming from discord.
    if (req.body.wumpus && req.body.wumpus === true) {
      data.wumpus = true
    }

    res.json({ emit: 'ws://display-song', status: 200, data })
  } catch (ex) {
    console.error(`[express] "now-playing.js" middleware has encounted an error`, ex)
    res.send(500)
  }
}
