import { Constants } from "discord.js"

export async function scheduled (options) {
  let job = {}
  return ''
}

function expectedOptions (options, keys) {
  let expected = {}
  // loop over the provided array of keys
  for (let i = 0; i <= keys.length -1; i++) {
    // try the key agianst provided options
    let option = options.get(keys[i])
    // save matched to expected object
    if (option.name === keys[i]) {
      Object.assign(expected, { [option.name]: option.value })
    }
    //
    expected.creation = Date.now()
    let dayInMilliseconds = 86400000
    // set the time value to the date object.
    // expected.initalEventDate = 
    // UTC MIllISECONDS == 'day = 86400000 | week * 7
  }
  console.log(expected)
  return expected
}

export const registration = {
  status: ':red_square:',
  name: 'schedule',
  description: 'something needs to be here?',
  options: [
    {
      name: 'time',
      description: '2400 Time of day to send message',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'iteration',
      description: 'Accepts verbs such as: Daily, Weekly, Monthly',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'channel',
      description: 'Provide the channel for the message to be shown. (Defaults to issuing channel.)',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.CHANNEL
    },
    {
      name: 'message',
      description: 'A Normal Discord Message.',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ]
}

export async function responses (interaction, options) {
  console.log({
    interaction,
    options
  })

  const optionsObject = expectedOptions(options, ['message', 'time', 'iteration', 'channel'])

  interaction.reply('thanks!')
}
