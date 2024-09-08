# scrambled

## API

> every endpoint expects `token` to be provided in body.

<details>
  <summary>POST /dom/message</summary>
  
  display a message on the client stage, if any.</span>
  
  ```shell
  # example request
  curl --request POST \
  --url http://localhost:3000/api/v1/dom/message \
  --header 'content-type: application/json' \
  --data '{ "token": "TOKEN", "author": "AUTHOR", "message": "MESSAGE", "timeout": 10000 }'
  ```

  ```JSON
  // successful...
  {
    "emit": {
      "name": "message",
      "data": {
        "author": "author",
        "message": "message",
        "timeout": 10000,
        "delay": 0,
        "animation": ""
      }
    },
    "status": 200
  }
  ```

  ```js
  // display the posted data on the stage
  socket.on('message', async (data) => { await stage.display('message', data) })
  ```

</details>

<details>
<summary>POST /dom/element</summary>
  - spawn a small floating image to the client stage, if any.
</details>
<details>
  <summary>POST /spotify/now</summary>
  display the currently playing track from Spotify.
</details>
<details>
<summary>POST /twitch/creator`</summary>
  - obtain creator id for authenticated account.
</details>
- `POST /twitch/creator/ads`
  - ad schedule information from Twitch.
- `POST /twitch/creator/channel`
  - account channel information.
- `POST /twitch/creator/channel/followers`
  - account followers list.



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
