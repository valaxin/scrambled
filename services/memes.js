import axios from 'axios'
import fs from 'fs'
import cfg from '../config.js'

export const registration = {
  status: ':red_square:',
  name: 'memes',
  description: 'memes'
}

export const responses = async (interaction) => {
  console.log(`${itData.user.full} issued "${itData.command.type}" "/${itData.command.name}" @ ${new Date().toUTCString()}`)
  
  interaction.reply({ embeds: [ '' ], empheral: true })
}