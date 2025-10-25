# Scrambled
# scrambled

## About

this here's a automation server that you can interfaces with discord among other services

- discord bot (jimbo)
- express rest api
- websocket data daemons
- alert stage

## Rest API

| Method | Endpoint              | Returns | Purpose                                                    |
| ------ | --------------------- | ------- | ---------------------------------------------------------- |
| GET    | /api/song             | STATUS  | emits the currently playing track on Apple Music           |
| GET    | /api/twitch           | JSON    | creator information                                        |
| GET    | /api/twitch/ads       | JSON    | ad schedule information                                    |
| GET    | /api/twitch/followers | JSON    | collection of follower objects                             |
| GET    | /api/messages         | JSON    | collection of message objects                              |
| GET    | /api/messages/:author | JSON    | collection of messages by the provided author              |
| GET    | /api/messages/:id     | JSON    | a single message object                                    |
| POST   | /api/message          | JSON    | create a new message                                       |
| DELETE | /api/message/:id      | STATUS  | delete a single message by id                              |
| DELETE | /api/messages/:author | STATUS  | delete all the messages by a single author                 |

Every endpoint requires a `token` either in `req.body` or `req.query` you choose. This token is set within the `.env` file, the application expects the key `SCRAMBLED`. For what are hopefully obvious reasons this file isn't included.

> [!WARNING]
> Unfinished and likely broken...

- can `POST` a new request and message but cant collect them?


---

### How To

```shell
git clone https://github.com/valaxin/scrambled.git
cd ./scrambled
npm install
echo "secrets=here" > ./.env
npm run bot:deploy
# then
npm run dev
# or
npm run bot:dev
# or
npm run web:dev
```