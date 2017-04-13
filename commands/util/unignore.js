const { Command } = require('discord.js-commando');

module.exports = class UnignoreCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unignore',
			group: 'util',
			memberName: 'unignore',
			description: 'Make the bot stop ignoring a specific channel.',
			guildOnly: true,

			args: [
				{
					key: 'channel',
					prompt: 'which channel would you like me to stop ignoring?\n',
					type: 'channel',
					default: ''
				}
			]
		});
	}

	hasPermission(msg) {
		return msg.member.hasPermission('MANAGE_GUILD') || msg.member.hasPermission('MANAGE_CHANNELS');
	}

	run(msg, args) {
		const channel = args.channel || msg.channel;
		const ignored = this.client.provider.get('global', 'ignoredChannels', []);

		if (!ignored.includes(channel.id)) return msg.reply('this channel isn\'t on the ignore list, gomen! <(￢0￢)>');

		const index = ignored.indexOf(channel.id);
		ignored.splice(index, 1);
		this.client.provider.set('global', 'ignoredChannels', ignored);
		return msg.reply(`I'm baaack!  ＼(≧▽≦)／ (not going to ignore ${channel} anymore).`);
	}
};
