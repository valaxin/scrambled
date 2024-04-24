const db = require('../data/scheduled.json')
const log = require('../support/_eventLogger.js')
const cron = require('node-cron');

// read databse
module.exports = {

  alarm: async (message, date, time) => {
    try {
      //const ct = convertToCronFormat(date,)

    } catch (e) { return Error(e) }
  }

}

/*

if (!db || !db.alarms) {
  return false
}

db.alarms.forEach(alarm => {
  console.log(alarm)
})

const registerBasicMessageJob = (job, time) => {

  try {
    // cron.schedule(time, () => {
      channel.send(job.message)
    }, {})
    log('job added!')
    console.log(cron.getTasks())
    return 
  } catch(error) {
    log(error, 'ERR!')
  }
}

module.exports = async (channel) => {

  try {
    db.alarms.forEach(alarm => {
      console.log(alarm)
      
    })
  } catch (error) {
    log(error, 'ERR!')
  }

  log('Starting scheduled tasks', 'OK!')

  var task = cron.schedule('59 * * * * *', () =>  {
    channel.send('beep')
  }, {
    scheduled: false
  });

  task.start()
  let t = 0
  setInterval(async () => {
    console.log(t = t += 1)
  }, 1000);

  console.log(cron.validate('1 * * * *'))
  // console.log(cron.getTasks())

}

*/