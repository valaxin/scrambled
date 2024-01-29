import chalk from 'chalk'

export default {
  opt: {},
  log: (color, message) => {
    if (opt.file) { message = `[${opt.file}] ${message}` }
    return console.log(`${color} :: ${message}`)
  },
  sav: async () => {}
}