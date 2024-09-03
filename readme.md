# scrambled

## API

| method | uri                               | purpose                                                   |
| ------ | --------------------------------- | --------------------------------------------------------- |
| POST   | /display/message                  | display a message on the client stage, if any.            |
| POST   | /display/element                  | spawn a small floating image to the client stage, if any. |
| POST   | /spotify/now                      | display the currently playing track from Spotify.         |
| POST   | /twitch/creator                   | obtain creator id for authenticated account.              |
| POST   | /twitch/creator/ads               | ad schedule information from Twitch.                      |
| POST   | /twitch/creator/channel           | account channel information.                              |
| POST   | /twitch/creator/channel/followers | account followers list                                    |
|        |                                   |                                                           |

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
