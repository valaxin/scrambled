import ytdl from 'ytdl-core'

export default {
  name: 'play',
  description: 'Play & queue media from youtube',
  status: ':red_square:',
  execute: async (message) => {
    
    try {
      let args = message.content.split(' ')
      let queue = message.client.queue
      let serverQueue = message.client.queue.get(message.guild.id)
      let voiceChannel = message.member.voice.channel
      
      /**
       * If issuing user isn't in voice channel, ask them to join one.
       */
      if (!voiceChannel)
        return message.channel.send('You need to be in a voice channel to play music!')

      /**
       * If permissions for voice channels aren't available to bot, ask for them.
       */
      const permissions = voiceChannel.permissionsFor(message.client.user)
      if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send(
          'I need the permissions to join and speak in your voice channel!'
        )
      }

      /**
       * Obtain information about the provided Youtube video, store in Object.
       */
      const songInfo = await ytdl.getInfo(args[1])
      const song = {
        title: songInfo.videoDetails.title,
        id: songInfo.videoDetails.videoId,
        url: `https://youtu.be${songInfo.videoDetails.videoId}`,
        description: songInfo.videoDetails.description,
        views: songInfo.videoDetails.viewCount
      }

      console.log(song)
      
      console.log(voiceChannel.id)
      console.log(662461725890838534)

      if (!serverQueue) {
        
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 3,
          playing: true
        }

        queue.set(message.guild.id, queueContruct)

        queueContruct.songs.push(song)

        // this should be making a 
        /*
        try {
          var connection = await voiceChannel.join()
          queueContruct.connection = connection
          this.play(message, queueContruct.songs[0])
        } catch (err) {
          console.log(err)
          queue.delete(message.guild.id)
          return message.channel.send(err)
        }
        */

      } else {
        serverQueue.songs.push(song)
        return message.channel.send(`${song.title} has been added to the queue!`)
      }

    } catch (error) {
      console.log(error)
      message.channel.send(error.message)
    }
  },

  play(message, song) {
    const queue = message.client.queue
    const guild = message.guild
    const serverQueue = queue.get(message.guild.id)

    if (!song) {
      serverQueue.voiceChannel.leave()
      queue.delete(guild.id)
      return
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on('finish', () => {
        serverQueue.songs.shift()
        this.play(message, serverQueue.songs[0])
      })
      .on('error', error => console.error(error))
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
    serverQueue.textChannel.send(`Start playing: **${song.title}**`)
  }
}