const { Command } = require('discord.js-commando');
const winston = require('winston');

module.exports = class StreamCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stream',
			group: 'util',
			memberName: 'stream',
			description: 'Set a custom streaming message for the bot.',

			args: [
				{
					key: 'message',
					prompt: 'what message should the bot display?\n',
					type: 'string',
					default: ''
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, { message }) {
		if (message === 'disable' || !message) {
			if (!this.client.customStream) return msg.say('There was no custom streaming message enabled.');
			this.client.customStream = false;
			winston.info(`[SHARD: ${this.client.shard.id}] CUSTOM STREAMING MESSAGE REMOVED`);
			return msg.say('Disabled the custom streaming message.');
		}

		this.client.customStream = true;
		winston.info(`[SHARD: ${this.client.shard.id}] CUSTOM STREAMING MESSAGE SET TO "${message}"`);
		this.client.shard.broadcastEval(`
			this.user.setGame('${message}', 'https://twitch.tv/listen_moe');
		`);
		return msg.say(`Custom streaming message set to "${message}".`);
	}
};
