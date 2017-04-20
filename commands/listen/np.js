const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');

module.exports = class NowPlayingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'np',
			aliases: ['now-playing'],
			group: 'listen',
			memberName: 'np',
			description: 'Display the currently playing song.'
		});
	}

	run(msg) {
		const permission = msg.channel.permissionsFor(this.client);
		if (!permission.hasPermission('EMBED_LINKS')) {
			return msg.say(oneLine`
				I don't have permissions to post embeds in this channel,
				if you want me to display the currently playing song, please enable it for me to do so!
			`);
		}
		const { radioInfo } = this.client;

		const nowplaying = `${radioInfo.artistName ? `${radioInfo.artistName} - ` : ''}${radioInfo.songName}`;
		const anime = radioInfo.animeName ? `Anime: ${radioInfo.animeName}` : '';
		const requestedBy = radioInfo.requestedBy
			? `Requested by: [${radioInfo.requestedBy}](https://forum.listen.moe/u/${radioInfo.requestedBy})`
			: '';
		const song = `${nowplaying}\n\n${anime}\n${requestedBy}`;

		return msg.channel.sendEmbed({
			color: 15473237,
			fields: [
				{
					name: 'Now playing',
					value: song
				}
			]
		});
	}
};
