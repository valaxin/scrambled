# scrambled

> personal automations by way of discord

---

## directory spec

> two applications as one

#### /bot

| pattern            | type   | purpose                                           |
| ------------------ | ------ | ------------------------------------------------- |
| .                  | folder | top most folder for discord bot                   |
| ./commands/**/*.js | folder | container for every commands available to the bot |
| ./events/*.js      | folder | event handers for discord/user interactions       |
| ./helpers/*.js     | folder | bot related helper scripts                        |
| ./deploy.js        | file   | register slash commands to guild                  |
| ./remove.js        | file   | remove commands from guild/global                 |
| ./index.js         | file   | bot entry point                                   |

#### /web

| pattern                | type   | purpose                                         |
| ---------------------- | ------ | ----------------------------------------------- |
| .                      | folder | top most folder for companion express app       |
| ./middleware/*.js      | folder | local express middleware                        |
| ./public/*             | folder | served public directory                         |
| ./public/modules/*.js  | folder | client facing javascript modules                |
| ./public/resources/*.* | folder | static client resources                         |
| ./public/index.html    | file   | client html markup                              |
| ./public/styles.css    | file   | client stylesheet                               |
| ./public/main.js       | file   | client javascript entry point                   |
| ./services/*.js        | folder | daemons that run to provide live data to client |
| ./app.js               | file   | express web app entry point                     |
| ./api.js               | file   | small route handler                             |

#### /scrambled

| pattern             | type   | purpose                                        |
| ------------------- | ------ | -----------------------------------------------|
| .                   | folder | project folder                                 |
| ./package.json      | file   | project dependencies                           |
| ./package-lock.json | file   | lock file (generated; shouldn't edit directly) |
| ./.env              | file   | environment variables (required)               |
| ./.gitignore        | file   | tell git scm what to ignore                    |
| ./readme.md         | file   | information about this application             |
| ./license.md        | file   | license information                            |
