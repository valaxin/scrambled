module.exports = {
  name: 'queue',
  descriptio: 'display the current queue if one',
  status: ':green_square:',
  execute (message) {
    const serverQueue = message.client.queue.get(message.guild.id)
    if (!serverQueue) {
      message.reply(`there is no queue to show, rune \`~search\` or \`~play\` to create one`)
    } else {
      let embed = {
        title: 'Song Queue',
        fields: []
      }
      serverQueue.songs.forEach((song, index) => {
        embed.fields.push({ name: `**${index +1}.** ${song.title}`, value: song.url })
      })
      message.reply({ embed })
    }
  }
}