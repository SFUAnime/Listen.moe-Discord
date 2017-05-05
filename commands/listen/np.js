const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { Util } = require('discord.js')

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
		if (msg.channel.type !== 'dm') {
			const permission = msg.channel.permissionsFor(this.client.user);
			if (!permission.hasPermission('EMBED_LINKS')) {
				return msg.say(oneLine`
					I don't have permissions to post embeds in this channel,
					if you want me to display the currently playing song, please enable it for me to do so!
				`);
			}
		}

		const { radioInfo } = this.client;

		const nowplaying = `${radioInfo.artist_name ? `${radioInfo.artist_name} - ` : ''}${radioInfo.song_name}`;
		const anime = radioInfo.anime_name ? `Anime: ${radioInfo.anime_name}` : '';
		const requestedBy = radioInfo.requested_by
			? /\s/g.test(radioInfo.requested_by)
				? `🎉 **${Util.escapeMarkdown(radioInfo.requested_by)}** 🎉`
			: `Requested by: [${Util.escapeMarkdown(radioInfo.requested_by)}](https://forum.listen.moe/u/${radioInfo.requested_by})`
			: ''; //the markdown for requested by needs to be escaped carefully to avoid escaping out the special event ** markdown
		const song = `${Util.escapeMarkdown(nowplaying)}\n\n${Util.escapeMarkdown(anime)}\n${requestedBy}`;

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
