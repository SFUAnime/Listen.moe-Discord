![LISTEN.moe](https://i.imgur.com/t8Zg2YJ.jpg)

# Official Listen.moe Discord Bot

The official discord bot that streams [Listen.moe](https://listen.moe) to your discord server. [Add it to your server here!](https://discordapp.com/oauth2/authorize?&client_id=222167140004790273&scope=bot&permissions=36702208)

## Usage

- After you've added the bot to your server, join a voice channel and type `~~join` to bind the bot to that channel.
- At any time, anyone can use the "Now playing" command to see what song is being played and who requested it.
- The bot's "game" will alternate between the server count and the currently playing song every 15 seconds.

## Command list

This list assumes a prefix of `~~`.

- `~~join`
  Type this while in a voice channel to have the bot join that channel and start playing there.

- `~~leave`
  Makes the bot leave the voice channel it's currently in. Limited to users with the "manage server" permission.

- `~~np`
  Gets the currently playing song and artist. If the song was requested by someone, also gives their name and a link to their profile on forum.listen.moe.

- `~~ignore`
  Ignores commands in the current channel. Admin commands are exempt from the ignore. Limited to users with the "manage server" / "manage channels" permission.

- `~~unignore`
  Unignores commands in the current channel. Limited to users with the "manage server" / "manage channels" permission.
  
- `~~ignore all`
  Ignores commands in all channels on the guild. Limited to users with the "manage server" / "manage channels" permission.
  
- `~~unignore all`
  Unignores all channels on the guild. Limited to users with the "manage server" / "manage channels" permission.

- `~~prefix <new prefix>`
  Changes the bot's prefix for this server.

## Run it yourself

NodeJS version 7.6+ is required. 

- Clone the repo.
- Create a Discord OAuth application and bot account.
- Rename/duplicate `config-sample.json` to `config.json` and fill out the relevant information.
- Install dependencies from npm.
- Install ffmpeg - if on Windows, make sure to add it to your PATH.
- Run the bot with `node Listen.js` or if you use pm2 `pm2 start Listen.js`
