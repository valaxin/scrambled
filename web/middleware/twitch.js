'use strict'

import 'dotenv/config'

export async function getTwitchBroadcastor (req, res, next) {
  const user = await fetch (process.env.TWITCH_CREATOR_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${req.twitch.access_token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID
    }
  })
  const data = await user.json()
  req.twitch.creator = data.data[0]
  next()
}

export async function getTwitchAdSchedule (req, res, next) {
  try {
    const url = `${process.env.TWITCH_CREATOR_ADS_ENDPOINT}?broadcaster_id=${req.twitch.creator.id}`
    const schedule = await fetch (url, {
      headers: {
        'Authorization': `Bearer ${req.twitch.access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }
    })
    const data = await schedule.json()
    res.json([ req.twitch.creator.id, data ])
  } catch (ex) {
    console.log('"getTwitchAdSchedule()" Exception!:', ex)
    res.sendStatus(500)
  }
}

export async function getTwitchChannelInfo (req, res, next) {
  try {
    const url = `${process.env.TWITCH_CREATOR_CHANNEL_ENDPOINT}?broadcaster_id=${req.twitch.creator.id}`
    const schedule = await fetch (url, {
      headers: {
        'Authorization': `Bearer ${req.twitch.access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }
    })
    const data = await schedule.json()
    console.log(data)
    res.json([ req.twitch.creator.id, data ])
  } catch (ex) {
    console.log('"getTwitchChannelInfo()" Exception!:', ex)
    res.sendStatus(500)
  }
}

export async function getTwitchChannelFollowers (req, res, next) {
  try {
    const url = `${process.env.TWITCH_CREATOR_FOLLOWERS_ENDPOINT}?broadcaster_id=${req.twitch.creator.id}`
    const schedule = await fetch (url, {
      headers: {
        'Authorization': `Bearer ${req.twitch.access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }
    })
    const data = await schedule.json()
    console.log(data)
    res.json([ req.twitch.creator.id, data ])
  } catch (ex) {
    console.log('"getTwitchChannelFollowers()" Exception!:', ex)
    res.sendStatus(500)
  }
}