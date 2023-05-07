export default {
  parseInteractionData: async (data) => {
    try {
      let capturedData = {
        user: {
          full: `${data.user.username}#${data.user.discriminator}`,
          name: data.user.username,
          icon: data.user.avatar,
          discriminator: data.user.discriminator,
          nickname: data.member.nickname,
          status: { bot: data.user.bot, sys: data.user.system },
          channelId: data.channelId,
          guild: {
            name: data.guild.name,
            id: data.guildId,
            icon: data.member.guild.icon,
            joined: data.member.guild.joinedTimestamp,
            members: data.guild.memberCount,
            locale: data.member.guild.preferredLocale
          }
        },
        command: {
          id: data.commandId,
          name: data.commandName,
          type: data.type
        }
      }
      console.log(data)
      // console.log(capturedData)
      return capturedData
    }
    catch (msg) {
      throw new Error(msg)
    }
  },
  readableProcUptime: async () => {
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
    return dateString
  }
}
