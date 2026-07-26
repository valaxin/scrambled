# scrambled

> [!WARNING]
> work in progress

A easy to use self-hosted discord bot, written solo in JavaScript.

## Included Features

- [x] media search (omdb/imdb)
- [ ] stream alerts (twitch/youtube)
- [ ] user participation scores
- [ ] custom emoji/stickers/gif reactions
- [ ] reaction based role assignment
- [ ] pull request alerts (github)
- [ ] game achievements get (retro achievements)
- [ ] calendar/event management
- [ ] thread automations

## Local Development

```bash
# clone then navigate into project directory
git clone https://github.com/valaxin/castle.git
cd ./castle

# install project dependices
npm install

# register commands with discord
npm run deploy

# run development instance
npm run dev
```

`npm run dev` is just `node ./client.js` making it our entry point.

`/utitlies/*.js`

## License

Released under the MIT license.
