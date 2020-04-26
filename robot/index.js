#!/usr/bin/env node

const discord = require('discord.js')
const options = require('./_config.js')
const Handler = require('./_interfaces.js')

const client = new discord.Client()
const commands = new Handler(client)

function autoexec () {
  options.users.mixer.forEach(async user => {
    await commands.mixer(false, [user, '.5', options.keys.discord.defaultChannel])
  })
  options.users.twitch.forEach(async user => {
    await commands.twitch(false, [user, '.5', options.keys.discord.defaultChannel], options.keys.twitch.id)
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
})

client.login(options.keys.discord.token)