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

			args: [
				{
					key: 'channel',
					prompt: 'Which channel would you like me to ignore?',
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

		if (ignored.includes(channel.id)) return msg.reply('this channel is already on the ignore list, baka! ｡゜(｀Д´)゜｡');

		ignored.push(channel.id);
		winston.info(oneLine`
			[SHARD: ${this.client.shard.id}] CHANNEL IGNORE:
			(${channel.id}) ON GUILD ${msg.guild.name} (${msg.guild.id})
		`);
		this.client.provider.set('global', 'ignoredChannels', ignored);
		return msg.reply('gotcha! I\'m going to ignore this channel now. (￣▽￣)');
	}
};
