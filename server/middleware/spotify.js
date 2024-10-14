'use strict'

import 'dotenv/config'
import app from '../app.js'

/**
 * 
 * @param {String} token Spotify Access Token
 * @returns {Object} fresh current track information in json form
 */
async function requestSongData (token) {
  try {
    let path = process.env.SPOTIFY_NOWPLAYING_ENDPOINT
    let opts = { headers:  { Authorization: `Bearer ${token}` }}
    let resp = await fetch(path, opts)
    
    if (resp.status > 400) {
      throw new Error(`[express] ${resp.status} :: ${resp.statusText}`)
    }
    
    if (resp.status === 204) {
      return {
        status: resp.status,
        is_playing: false
      }
    }
    
    let song = await resp.json()
    let response = {
      status: resp.status,
      song: {
        title: song.item.name,
        artist: song.item.artists.map((artist) => artist.name).join(', '),
        album: song.item.album.name,
      },
      is_playing: song.is_playing,
      progress_ms: song.progress_ms,
      duration_ms: song.item.duration_ms
    }

    console.log(`[express] (Spotify) >> "${response.song.title} -  ${response.song.artist}"`)
    console.log(`[express] (Spotify) >> "is_playing=${response.is_playing}"`)
    return response
  } catch (ex) {
    console.error(ex)
    res.sendStatus(500)
    return ex
  }
}

export default async function nowPlaying (req, res, next) {
  try {
    req.spotify.songdata = await requestSongData(req.spotify.access_token)
    console.log(`[express] (Spotify) >> "ws://scrambled/stage/spotify"`)
    if (req.query.data === 'true') {
      console.log(`[express] >> req.spotify.songdata ::`, req.spotify.songdata)
      res.json(req.spotify.songdata)
    } else {
      res.sendStatus(200)
    }
  } catch (ex) {
    console.error(ex)
    res.sendStatus(500)
  }
}