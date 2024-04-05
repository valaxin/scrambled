
const quiz = [
	{
		"question": "What color is the sky?",
		"answers": ["blue"]
	},
	{
		"question": "How many letters are there in the alphabet?",
		"answers": ["26", "twenty-six", "twenty six", "twentysix"]
	}
]




export default {
	name: 'test',
	description: 'test command',
	status: ':green_square:',
	arguments: 'none',
	execute: async (message, options, client) => {
    
    message.channel.send(`how're you?`)
    
    const filter = response => { console.log(response.content); return true }

    message.channel.awaitMessages({ filter, max: 4, time: 10000, errors: ['time'] })
      .then(collected => console.log(collected.size))
      .catch(collected => console.log(`caught error ${collected.size}`))
    
  }
}