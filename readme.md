# scrambled

> a discord bot

## Purpose

A simple bot that's easily scalable with a module system for easy command creation, and easy configuration. Providing a solution for streamer go-live/online alerts from both static and dynamic sources. Along with a YouTube radio player and meme source for its users.

---

## Install

Copy the project from it's repository on github

```bash
git clone https://github.com/valaxin/scrambled.git
```

Navigate to the project's directory root

```bash
cd path/to/scrambled
```

Create the required [./config.json](/#options) file

```bash
touch ./config.json
```

Install needed dependencies and run

```bash
yarn && yarn start
```

---

## Options

```json
{
  "prefix": "~",
  "keys": {
    "discord": { "id": "DISCORD_CLIENT_ID" },
    "twitch": { "id": "TWITCH_CLIENT_ID" }
  },
  "users": {
    "mixer": [ "mixer-username" ],
    "twitch": [ "twitch-username" ]
  },
  "presence": {}
}
```

---

## Commands

### `help` - list all available commands

### `meme` - request memes from the internets

> arguments: `<subreddit-name:optional>` default: 'blursed'

### `mixer` - watch for a given stream to go live

> arguments: `<mixer-username:required>`, `<timeout:optional>`, `<channel:optional>`

### `nowplaying`- get the song that is playing

### `play` - play & queue a song in your channel

> arguments: `<youtube-url:required>`

### `purge` - delete the last messages in all chats

> arguments: `<number-of-posts:required>`

### `skip` - skip a song in queue

### `stop` - stop all songs in the queue

### `twitch` - watch a twitch streamer for go live event

> arguments: `<twitch-username:required>`, `<timeout:optional>`, `<channel:optional>`

### `userinfo` - get information about a user.

> arguments: `<user-mention:required>`

### `search` - search youtube for something to play

> arguments: `<query:required>`

### `queue` - see the current queue if one

### `uptime` - see bot up time

### `video` - get a video from the web

> arguments: `<subreddit-name:optional>`

### `set` - set differnt values for bot

> arguments: `<key:required>`, `<value:required>`

---

## Command Example

within `./commands` create a file with the name of the command. ex: `/ping.js` and should contain the following to work correctly with this bot.

```javascript

// name, desc, status are used for easy ingestion and display
module.exports = {
  name: 'ping',
  description: 'ping/pong command',
  status: '',
  execute: (message, options) => {
    // within is fired when command is sent.
    message.channel.send('pong')
  }
}
```

---

- functionality absorbed from [TannerGabriel/discord-bot](https://github.com/TannerGabriel/discord-bot)
- discord [dev portal](https://discord.com/developers)
- invite link / permission [calculator](https://discordapi.com/permissions.html)
- built with [discord.js](https://github.com/discordjs/discord.js) on [node.js](https://nodejs.org)
