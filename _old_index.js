#!/usr/bin/env node

const fs = require('fs')
const Discord = require('discord.js')
const Client = require('./client/Client')

const options = require('./config.json')

const client = new Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log(client.commands);

// const queue = new Map()

function autoexec () {
  // for mixer users ...
  options.users.mixer.forEach(async user => {
    // await cmd.mixer(false, [user, '.5', options.keys.discord.defaultChannel])
  })

  // for twitch users ...
  options.users.twitch.forEach(async user => {
    // await cmd.twitch(false, [user, '.5', options.keys.discord.defaultChannel], options.keys.twitch.id)
  })
}

client.once('ready', async () => {
  client.user.setPresence(options.presence)
  autoexec()
})

client.once('reconnecting', () => {
	console.log('Reconnecting!')
})

client.once('disconnect', () => {
	console.log('Disconnect!')
})

client.on('message', async message => {
  
  if (message.author.bot) return
  if (message.content[0] !== options.prefix) return 
  // let serverQueue = queue.get(message.guild.id);

  let args = message.content.slice(options.prefix.length).trim().split(/ +/g)
  let input = args.shift().toLowerCase()

  /*

  if (input === 'help') await cmd.help(message, args)  
  
  if (input === 'meme') await cmd.meme(message, args)
  // if (input === 'news') await commands.news(message, args)

  if (input === 'mixer') await cmd.mixer(message, args)
  if (input === 'twitch') await cmd.twitch(message, args, options.keys.twitch.id)

  if (input === 'play') play.execute(message)
  if (input === 'skip') play.execute(message)
  if (input === 'stop') play.execute(message)
  
  // if (input === 'play') await play(message, serverQueue)
  // if (input === 'skip') await skip(message, serverQueue)
  // if (input === 'stop') await stop(message, serverQueue)

  */

  const command = client.commands.get(input);

  try {
    if(input == 'twitch') {
      command.execute(message, args, options.keys.twitch.id);
    } else if (input == 'ban' || input == 'userinfo') {
      command.execute(message, client);
    } else {
      command.execute(message, args);
    }
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }

})

client.login(options.keys.discord.token)