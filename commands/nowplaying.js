module.exports = {
	name: 'nowplaying',
	description: 'get the song that is playing',
	status: ':green_square:',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id)
		if (!serverQueue) return message.channel.send('There is nothing playing.')
		return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`)
	}
}