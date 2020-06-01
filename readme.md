# scrambled
> a crappy discord bot

## Purpose

A simple bot that's easily scalable with a module system for easy command creation, and easy configuration. Providing a solution for streamer go-live/online alerts from both static and dynamic sources. Along with a YouTube radio player and meme source for its users.

## Install

Copy the project from it's repository on github
```bash
$ git clone https://github.com/valaxin/scrambled.git
```

Navigate to the project's directory root
```bash
$ cd path/to/scrambled
```

Create the required ./config.json file
```bash
$ echo "{ keys: { discord: { id: "DISCORD_CLIENT_ID" }, \
  twitch: { id: "TWITCH_CLIENT_ID" }}}" > ./config.json
```

Install needed dependencies and run
```bash
$ yarn && yarn start
```

## Options

```json
{
  "keys": {
    "discord": { "id": "DISCORD_CLIENT_ID" },
    "twitch": { "id": "TWITCH_CLIENT_ID" }
  },
  "users": {
    "mixer": [ "mixer-username" ],
    "twitch": [ "twitch-username" ]
  },
  "poll_timeout_mins": 5,
  "presence": {},
  "watch": false
}
```

## Commands

### `~`
Default prefix

#### `help` - list all available commands 
- working 

#### `meme` - request memes from the internets
- arguments: `<subreddit-name:optional>` (defaults to r/blursed)
- semi-working (needs, video handling/filtering) 

#### `mixer` - watch for a given stream to go live 
- arguments: `<mixer-username:required>`, `<timeout:optional>`, `<channel:optional>`
- working (could always use refinement) 

#### `nowplaying`- get the song that is playing 
- working 

#### `play` - play & queue a song in your channel 
- arguments: `<youtube-url:required>` (caller needs to be in voice channel regardless of args)
- working 

#### `purge` - delete the last messages in all chats
- arguments: `<number-of-posts:required>`
- working 

#### `skip` - skip a song in queue 
- working 

#### `stop` - stop all songs in the queue!
- working 

#### `test` - test test test
- testing 

#### `twitch` - watch a twitch streamer for go live event
- arguments: `<twitch-username:required>`, `<timeout:optional>`, `<channel:optional>`
- working-ish could also always use refinement 

#### `userinfo` - get information about a user.
- arguments: `<user-mention:required>`
- working

#### `search` - search youtube for something to play
- arguments: `<query:required>`
- semi-working

#### `queue` - see the current queue if one
- wip

## Issues



- functionality absorbed from [TannerGabriel/discord-bot](https://github.com/TannerGabriel/discord-bot)
- discord [dev portal](https://discord.com/developers)
- invite link / permission [calculator](https://discordapi.com/permissions.html)
- built with [discord.js](https://github.com/discordjs/discord.js) on [node.js](https://nodejs.org)
