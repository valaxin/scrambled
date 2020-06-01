module.exports = {
	name: 'search',
	description: 'search for youtube video to play',
	status: 'wip',
	async execute(message, options) {

    console.log(message, options)

    message.channel.send(options[0])
    
	}
}