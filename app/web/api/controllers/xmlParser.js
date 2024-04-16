let Parser = require('rss-parser');
let parser = new Parser();
var cron = require('node-cron');


const LatestPost = async (parser, address) => {
  const feed = await parser.parseURL(address)
  console.log(feed)

  cron.schedule('*/2 * * * *', () => {
    LatestPost(parser, address)
  });

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });

}

module.exports = { LatestPost }