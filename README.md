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

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Run it yourself

## Installation guide for Ubuntu 16.04.2 LTS

#### Install Docker

```bash
sudo apt-get update
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
sudo apt-get update
sudo apt-get install -y docker-engine
```

#### Install docker-compose
```bash
sudo pip install docker-compose
```

#### Get ready
```bash
wget https://raw.githubusercontent.com/WeebDev/Listen.moe-Discord/master/docker-compose.yml.example -O docker-compose.yml
```

***Fill out all the needed ENV variables.***

#### Launch docker-compose

```bash
docker-compose up -d
```

## Author

**Listen.moe-Discord** © [WeebDev](https://github.com/WeebDev), Released under the [MIT](https://github.com/WeebDev/Listen.moe-Discord/blob/master/LICENSE) License.<br>
Authored and maintained by WeebDev.

> GitHub [@WeebDev](https://github.com/WeebDev)
