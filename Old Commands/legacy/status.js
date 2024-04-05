export default {
  name: 'status',
  description: 'Returns the status of the bot',
  status: ':green_square:',
  execute: async (message) => {
    let uptime = process.uptime()
    let date = new Date(uptime * 1000)
    let days = date.getUTCDate() - 1
    let hours = date.getUTCHours()
    let minutes = date.getUTCMinutes()
    let seconds = date.getUTCSeconds()
    let milliseconds = date.getUTCMilliseconds()

    let segments = []

    if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'))
    if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'))
    if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'))
    if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'))
    if (milliseconds > 0) segments.push(milliseconds + ' millisecond' + ((seconds == 1) ? '' : 's'))

    let dateString = segments.join(', ')

    message.channel.send(`:arrow_up: :clock: **${dateString}**`)
  }
}