const { oneLine } = require('common-tags');
const { Command } = require('discord.js-commando');
const winston = require('winston');

module.exports = class IgnoreCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ignore',
			group: 'util',
			memberName: 'ignore',
			description: 'Make the bot ignore all commands in a specific channel',
			guildOnly: true,

			args: [
				{
					key: 'channel',
					prompt: 'which channel would you like me to ignore?\n',
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
		const ignored = msg.guild.settings.get('ignoredChannels', []);

		if (ignored.includes(channel.id)) return msg.reply('this channel is already on the ignore list, baka! ｡゜(｀Д´)゜｡');

		ignored.push(channel.id);
		winston.info(oneLine`
			[SHARD: ${this.client.shard.id}] CHANNEL IGNORE:
			(${channel.id}) ON GUILD ${msg.guild.name} (${msg.guild.id})
		`);
		msg.guild.settings.set('ignoredChannels', ignored);
		return msg.reply('gotcha! I\'m going to ignore this channel now. (￣▽￣)');
	}
};
