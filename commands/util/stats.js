const { Command } = require('discord.js-commando');

module.exports = class StatsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			group: 'util',
			memberName: 'stats',
			description: 'View the bot\'s stats.'
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg) {
		const { radioInfo } = this.client;

		const nowPlaying = `${radioInfo.artistName ? `${radioInfo.artistName} - ` : ''}${radioInfo.songName}`;
		const anime = radioInfo.animeName ? `Anime: ${radioInfo.animeName}` : '';
		const song = `${nowPlaying}\n\n${anime}\n${nowPlaying}`;

		const guildsAmount = (await this.client.shard.fetchClientValues('guilds.size'))
			.reduce((prev, next) => prev + next, 0);
		const voiceConnectionsAmount = (await this.client.shard.fetchClientValues('voiceConnections.size'))
			.reduce((prev, next) => prev + next, 0);

		return msg.embed({
			color: 15473237,
			author: {
				url: 'https://github.com/WeebDev/listen.moe-discord',
				name: 'Crawl, vzwGrey, Anon & Kana'
			},
			title: 'LISTEN.moe (Click here to add the radio bot to your server)',
			url: 'https://discordapp.com/oauth2/authorize?&client_id=222167140004790273&scope=bot&permissions=36702208',
			fields: [
				{ name: 'Now playing', value: song },
				{ name: 'Radio Listeners', value: radioInfo.listeners, inline: true },
				{ name: 'Discord Listeners', value: radioInfo.discordListeners, inline: true },
				{ name: 'Servers', value: guildsAmount, inline: true },
				{ name: 'Voice Channels', value: voiceConnectionsAmount, inline: true }
			],
			timestamp: new Date(),
			thumbnail: { url: 'http://i.imgur.com/Jfz6qak.png' }
		});
	}
};
