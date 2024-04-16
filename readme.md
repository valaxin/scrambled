# scrambled
> Personal Discord bot, built as a hobby/learning project.

## Overview
This peice of software comes in two parts, first a discord bot providing an interaction source, then an express web server providing both a rest api and authenticated gui to manage features.

there is a seperation of concerns present within the file structure,

App
- bot
  > all code and config related to the discord bot within
- web
  > all code and config related to express

- ./package.json
  > one shared package.json as the software is intended to be run as one.

userphases: 

1. a user inputs a command from discord
2. the command is determined to be a oneshot or reoccuring
2a. if oneshot: the bot will issue the command, (ex. a onetime alarm vs. a reoccuring)
2b. if reoccuring the command and it information will need to be registered with the webserver.
3. the command is issued and the information is provided to the user within discord. 

