import chalk from 'chalk'

export default async function (message, color) {
  return console.log(chalk[color](message))
}
