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

prefix: `/api/`

- `POST /api/spotify`
- `Query Parameters : ?data` 
- `Body : { "token": String, "name" : String }`
- `Returns : Status Code (200|204|403|500) or Object (?data)`

Token is required. A static value set within .env or inline and just a simple mesure to prevent unauthorized access as the software could be run in such a way that's it's exposed to wide web.

## Bot Commands

- `/help` - provides information about the discord bot.
- `/song` - returns the currently playing song. 

---
