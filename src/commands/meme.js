'use strict'

import 'dotenv/config'
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { stringToColor } from '../utilites/helpers.js'

const name = 'meme'
const description = 'replies with an random meme from https://meme-api.com/gimme'

const data = new SlashCommandBuilder().setName(name).setDescription(description)
const embed = new EmbedBuilder().setTitle(name)

export default {
  data,
  async execute(interaction) {
    try {
      const meme = {}
      meme.request = await fetch('https://meme-api.com/gimme', { headers: { Content: 'application/json' } })
      meme.json = await meme.request.json()

      const userUrl = `https://reddit.com/u/${meme.json.author}`
      const sourceUrl = `https://reddit.com/r/${meme.json.subreddit}`

      // random zingers!
      const responses = [
        'Bingo, enjoy the meme!',
        'Ayy Lmao!',
        'Damn son whered you find this',
        'Peak Cinema!',
        'fingers crossed!',
      ]

      let rmax = responses.length - 1
      let rmin = 0
      let rran = Math.random() * (rmax - rmin) + rmin
      let fint = `${rran}`.split('.')[0]
      let color = await stringToColor(`${meme.json.author}-${meme.json.ups}`)

      embed.setImage(meme.json.url)
      // console.log(fint, rmax, meme.json)
      embed
        .setDescription(
          `${responses[fint]}\n\nPosted by [**u/${meme.json.author}**](${userUrl}) to the [**r/${meme.json.subreddit}**](${sourceUrl}) subreddit, acheiving **${meme.json.ups}** upvotes.\n\n[**visit here**](${meme.json.postLink})`,
        )
        .setColor(color)
      await interaction.reply({
        embeds: [embed],
        flags: '',
      })
    } catch (error) {
      console.log(`oops! error with ${name} command`, error)
    }
  },
}
