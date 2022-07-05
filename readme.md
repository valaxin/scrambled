# scrambled

> A personal, extensable Discord bot.

## Purpose

A simple bot that's easily scalable with a module system for easy configuration and command creation. Providing a solution for streamer go-live/online alerts from both static and dynamic sources. Along with a YouTube radio player and meme source for its users.

---

## Install & Run 

Copy the project from it's repository on github by either cloning it via the cli or downloading the .zip archive. Once saved locally, navigate to the project folder. 

```bash
$ git clone https://github.com/valaxin/scrambled.git
$ cd path/to/scrambled
```

Create the **required** [config.js](/#options) file at the root level of the project, populate this file with the necessary information, Then install the dependencies and run. 

```bash
$ touch config.js
$ npm install
$ npm start
# or
$ npm run dev 
```

---

## Config Options

```javascript
export default {
  prefix: '~',
  keys: {
    discord: { id: 'DISCORD_CLIENT_ID' },
  },
  users: {
    twitch: [ 'twitch-username' ]
  },
  presence: {}
}
```

---

## Legacy Command Module Example

within the `./commands` directory create a file with the name of the command for example `ping.js` it should contain at least the following to work correctly with this bot.

```javascript

export default {
  name: 'ping',
  description: 'ping/pong command',
  status: ':green_squuare:',
  arguments: '<value:required>' // optional
  execute: async (message) => {
    message.channel.send('pong')
  }
}
```

---

## Available Commands

tba

---

- functionality absorbed from [TannerGabriel/discord-bot](https://github.com/TannerGabriel/discord-bot)
- discord [dev portal](https://discord.com/developers)
- invite link / permission [calculator](https://discordapi.com/permissions.html)
- built with [discord.js](https://github.com/discordjs/discord.js) on [node.js](https://nodejs.org)
