#!/usr/bin/env node

const discord = require('discord.js')
const options = require('./_config.js')
const Handler = require('./_interfaces.js')

const mixer = require('./cmds/mixer')
const twitch = require('./cmds/twitch')

const client = new discord.Client()
const commands = new Handler(client)

console.log(mixer)

function autoexec () {
  // for mixer users ...
  /*
  options.users.mixer.forEach(async user => {
    await mixer(false, [user, '.5', options.keys.discord.defaultChannel])
  })
  */

  // for twitch users ...
  options.users.twitch.forEach(async user => {
    await twitch(false, [user, '.5', options.keys.discord.defaultChannel], options.keys.twitch.id)
  })
}

client.on('ready', async () => {
  client.user.setPresence(options.presence)
  autoexec()
})

client.on('message', async message => {
  if (message.author.bot) return
  if (message.content[0] !== options.prefix) return 
  let args = message.content.slice(options.prefix.length).trim().split(/ +/g)
  let input = args.shift().toLowerCase()

  // incoming commands...
  // if (input === 'help') await commands.help(message, args)
  if (input === 'mixer') await commands.mixer(message, args)
  if (input === 'twitch') await commands.twitch(message, args, options.keys.twitch.id)
  if (input === 'meme') await commands.meme(message, args)
})

client.login(options.keys.discord.token)