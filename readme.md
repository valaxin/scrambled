# scrambled

## Installation

`git clone https://github.com/valaxin/scrambled.git`

`cd ./scrambled && npm install`

`npm run dev`

## Features

- small rest api for issuing commands to the stage.
- easy to understand data flow and handling expections.
- locally run and operated, small maintainable codebase.
- connected to twitch/spotify/discord.
- intergrated chat bot for viewer stage interaction.
- gate interation to those present both as a twitch follower and discord server memeber.

## API Endpoints

prefix: `/api/v1`

all end points will basically echo back what you gave it on success

- `POST /spotify/now` - now playing information

- `POST /display/image` - branding image, bottom right corner 128x128
- `POST /display/marquee` - horizontally scrolling text
- `POST /display/message` - front and centre message, 128 character limit

- `POST /twitch/creator` - returns id
- `POST /twitch/ads` - returns twitch ad schedule
- `POST /twitch/channel` - returns channel basic information
- `POST /twitch/followers` - returns follower information

## Bot Commands

- `/help` - provides information about the discord bot.
- `/msg <message>` - send a message to the stream.
- `/song` - returns the currently playing song. 

