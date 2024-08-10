#scrambled

## rest api

`POST /display/song`
`POST /display/message`

## commands

`/msg %message%`
`/help`

## running locally

ensure all required enviroment variables are valid install `node.js` then from within the project directory.

```shell

npm install
npm run bot:deploy
npm run start:bot
npm run start:web

```

at this point locally at the defined port you'll find the "green screen" element, this should be opened in OBS as a browser view. by default the element is only 1280x720.

the song-daemon will show the current spotify track for a defined amount of the elasped time. then hiding.

users of the discord bot who are also tuned into the stream can send messages directly. they feature a 128 character limit and a 10 second timeout by default.

!! discord usernames are shown
