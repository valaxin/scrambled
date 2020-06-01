module.exports = {
  name: 'queue',
  descriptio: 'display the current queue if one',
  status: 'wip',
  execute (message) {
    const serverQueue = message.client.queue.get(message.guild.id)
    if (!serverQueue) return
    console.log(serverQueue.songs)
    message.reply(JSON.stringify(serverQueue.songs))
  }
}