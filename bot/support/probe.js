const os = require('node:os')
const pkg = require('../../../package.json')

function secondsIntoReadableString (input) {
  try {
    const d = new Date(input * 1000)
    const t = {
      segments: [],
      uptime_seconds: input,
      days: d.getUTCDate() - 1,
      hours: d.getUTCHours(),
      minutes: d.getUTCMinutes(),
      seconds: d.getUTCSeconds(),
      milliseconds: d.getUTCMilliseconds()
    }

    if (t.days > 0) { 
      t.segments.push(t.days + ' day' + ((t.days == 1) ? '' : 's'))
    }
    
    if (t.hours > 0) {
      t.segments.push(t.hours + ' hour' + ((t.hours == 1) ? '' : 's'))
    }
    
    if (t.minutes > 0) {
      t.segments.push(t.minutes + ' minute' + ((t.minutes == 1) ? '' : 's'))
    }
    
    if (t.seconds > 0) {
      t.segments.push(t.seconds + ' second' + ((t.seconds == 1) ? '' : 's'))
    }
    
    if (t.milliseconds > 0) {
      t.segments.push(t.milliseconds + ' millisecond' + ((t.seconds == 1) ? '' : 's'))
    }

    t.friendly = t.segments.join(', ')
    return { d, t }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = async function probe () {
  try {
    const result = {
      system: {
        architecture: os.arch(),
        hostname: os.hostname(),
        platform: os.platform(),
        type: os.type(),
        uptime: secondsIntoReadableString(os.uptime()) || 'unknown'
      },
      host: {
        name: pkg.name,
        author: { username: pkg.author, profile: `https://github.com/${pkg.author}/` },
        version: pkg.version,
        description: pkg.description,
        license: pkg.license,
        uptime: secondsIntoReadableString(process.uptime()) || 'unknown',
        repo: `https://github.com/${pkg.author}/${pkg.name}.git/`
      }
    }
    return result 
  } catch (error) {
    throw error
  }
}
