'use strict'

import 'dotenv/config'

export default async function (app) {
  app.io.on('spotify-pong', (data) => {
    console.log('spotify-pong', data)
  })

  const updateInterval = (interval, timeout) => {
    interval._idleTimeout = timeout || 5000
    interval._repeat = timeout || 5000
    interval.refresh()
  }

  const interval = 5000

  async function queryEndpoint() {
    let state = ''
    let track_position = ''
    let path = `http://[${process.env.HOST}]:${process.env.PORT}/api/spotify`
    let resp = await fetch(`${path}?token=${process.env.SCRAMBLED}&data=true`)
    let data = await resp.json()

    // == Response Handling ==

    if (data.status === 204) {
      updateInterval(spotifyPing, interval * 4)
      state = 'inactive'
    }

    if (data.status === 200) {
      updateInterval(spotifyPing, interval / 2)
      track_position = 'first-half'
      state = 'playing'
    }

    if (data.status === 200 && data.is_playing === false) {
      updateInterval(spotifyPing, interval * 2)
      track_position = 'second-half'
      state = 'paused'
    }

    let remaining_ms = data.duration_ms - data.progress_ms
    let half_duration_ms = Math.floor(data.duration_ms / 2)

    if (half_duration_ms < remaining_ms) {
      /* do nothing */
    }

    if (half_duration_ms > remaining_ms) {
      data.visible = false
      updateInterval(spotifyPing, interval * 3)
    }

    app.io.emit('spotify-ping', data)
    console.log(
      `[daemon/current-track] "tick" state=${state}, position=${track_position}, poll-rate=${spotifyPing._repeat}ms`
    )
  }
  let spotifyPing = setInterval(queryEndpoint, interval)
  return 0
}
