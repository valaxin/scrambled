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
  
  }
}