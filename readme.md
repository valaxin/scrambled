# scrambled

> A light expandable Discord bot.

## Purpose

An intuative bot that's trival to scale. A module based command system, with readable configuration and command syntax. We're providing a solution for streamer go-live/online alerts from both static and dynamic sources.

---

## Download, Install then Run

Copy the project from it's repository on github by either cloning the repository or downloading the .zip archive. Once saved and available locally, navigate to the project's directory.

```shell
git clone https://github.com/valaxin/scrambled.git
cd ~/local/path/to/scrambled
```

Create the **required** [config.js](/#options) file at the root level of the project, populate this file with the necessary information, Then install the dependencies and run. 

```shell
touch config.js
# edit config
npm install
npm run dev 
```

---

## Config Options

Rather self explanitory, this discord key is the bot's client id, found withing the Discord developer portal. the twitch usernames are static preformers we monitor for go live events to alert the chat, 

```javascript
export default {
  prefix: '~',
  keys: {
    discord: { id: 'DISCORD_CLIENT_ID' },
  },
  users: {
    twitch: [ 'twitch-username' ]
  },
  urls: [
    '
  ]
  presence: {}
}
```

---

## Legacy Command Module Example

within the `./commands/legacy` directory create a file with the name of the command for example `ping.js` it should contain at least the following to work correctly with this bot.

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

## Slash Command Module Example

---

## Available Commands

---

- functionality absorbed from [TannerGabriel/discord-bot](https://github.com/TannerGabriel/discord-bot)
- discord [dev portal](https://discord.com/developers)
- invite link / permission [calculator](https://discordapi.com/permissions.html)
- built with [discord.js](https://github.com/discordjs/discord.js) on [node.js](https://nodejs.org)
