# scrambled

Personal Discord bot

## commands

- `/stream [series|movie] title<string> season<Number> episode<Number>`
- `/about`
- `/meme subreddit<String> sorting<String>`
- `/alarm [once|repeats] message<String> time<String>`

---


# todo

## notes

- have the bot put a message in chat from another file
- a command `/alarm` allowing the user to create either a reoccuring or oneshot alarm
- `/alarm` has two sub-commands. one path if the alarm is a one shot, the other if the user wants it to reoccur on an interval
- `/alarm` time format should be input `DD/MM/YYYY @ 00:00` ("day/month/year" "at-symbol" "twenty-four:hour-time") but also accept whatever the libray for `cron` jobs accepts
- `/alarm` should have three id generated from the `requestor/guild` id and one from the alarm `title/timestamp` and finally a `random-uuid`
- oneshot alarms should be issued and handled by the `bot`, these jobs should STILL be issued to the same `cron` job manager
- reoccuring alarms should be registered to the webserver and continuiously run as long as the registation object exists within the database
- `/alarm list` should list all the alarms on the server registered to the job manager under your requestor/guild id
- `/alarm [[list][delete|edit]once|repeated] [id?] body:String [when:String|interval:String[count:Number]]` = example command issueance

(as this bot/server isn't intended to be run at scale for large servers this should all be okay)

## resources

- [adv command creation](https://discordjs.guide/slash-commands/advanced-creation.html#advanced-command-creation)
- [sub commands](https://discordjs.guide/slash-commands/advanced-creation.html#subcommands)

I wanna use this instead of making a round trip.. as far as i know i could maybe issue events via a connection made to the existing wss provided by the running bot?
but i think this may also confalte the whole thing?,,,,

how does the server issue the update to discord?

--- more info ---

local alarm cron job, one shot alarm.
user issues `/alarm` command from discord
> `/alarm once body:<String> when:<String> channel:<Channel> mention:<Boolean>`

this generates a cron job that is given directly to the job manager
On execution the provided body is sent into chat

- `once` - denotes local job
- `body` - message of the alert
- `when` - dd/mm/yyyy@hh:mm time format
- `channel` - discord channel object
- `mention` - boolean option for wether or not requestor is mentioned in alert

repeating, web served cron jobs
> `/alarm repeats body:<String> when:<String> channel:<Channel> mention:<Boolean> interval:<String>`

- `repeats` - denotes remote(sever) repeating cron job
- `interval` - accepts pre defined values, (custom, daily, weekly, monthly, yearly)

this registers a cron job with the server, the payload of registration info is sent to by default `POST` `/api/cron/alarms/new` as `json` with a `200 ok!` on successful registration,
