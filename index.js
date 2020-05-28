#!/usr/bin/env node

const discord = require('discord.js')
const options = require('./config.json')

const cmd = {
  mixer: require('./commands/mixer'),
  twitch: require('./commands/twitch'),
  meme: require('./commands/meme')
}

const client = new discord.Client()
const queue = new Map()

function autoexec () {
  // for mixer users ...
  options.users.mixer.forEach(async user => {
    await cmd.mixer(false, [user, '.5', options.keys.discord.defaultChannel])
  })

  // for twitch users ...
  options.users.twitch.forEach(async user => {
    await cmd.twitch(false, [user, '.5', options.keys.discord.defaultChannel], options.keys.twitch.id)
  })
}

client.once('ready', async () => {
  client.user.setPresence(options.presence)
  // autoexec()
})

client.on('message', async message => {
  
  if (message.author.bot) return
  if (message.content[0] !== options.prefix) return 
  let serverQueue = queue.get(message.guild.id);

  let args = message.content.slice(options.prefix.length).trim().split(/ +/g)
  let input = args.shift().toLowerCase()

  if (input === 'help') await cmd.help(message, args)  
  
  if (input === 'meme') await cmd.meme(message, args)
  // if (input === 'news') await commands.news(message, args)

  if (input === 'mixer') await cmd.mixer(message, args)
  if (input === 'twitch') await cmd.twitch(message, args, options.keys.twitch.id)
  
  // if (input === 'play') await play(message, serverQueue)
  // if (input === 'skip') await skip(message, serverQueue)
  // if (input === 'stop') await stop(message, serverQueue)
})

client.login(options.keys.discord.token)