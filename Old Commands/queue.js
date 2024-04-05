export default {
  name: 'queue',
  description: 'Display the current audio queue if one exists',
  status: ':red_square:',
  execute: async (message) => {
    const serverQueue = message.client.queue.get(message.guild.id)
    if (!serverQueue) {
      message.reply('There is no queue to show, run the `search` or `play` command to create one.')
    } else {
      let embeds = [
        {
          title: 'Audio Queue:',
          fields: []
        }
      ]
      serverQueue.songs.forEach((song, index) => {
        embeds[0].fields.push({
          name: `**${index +1}.** ${song.title}`,
          value: song.url
        })
      })
      message.reply({ embeds })
    }
  }
}