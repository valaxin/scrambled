const chalk = require('chalk')
const { name, version } = require('../../package.json') 

module.exports = function log (message, status) {
  const sty = chalk.magenta.bold;
  console.log(sty(`[${name}@${version}] [${chalk.green(Date.now())}] ${message} ${chalk.green(status || '')}`))
}