const { Command } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'join',
			aliases: ['j'],
			group: 'listen',
			memberName: 'join',
			description: 'Make the bot join your voice channel.'
		});
	}

	run(msg) {
		if (msg.author.id === '83700966167150592') return msg.channel.sendMessage('I won\'t do that, tawake. （｀Δ´）！');

		if (msg.guild.voiceConnection) return msg.reply('I am already in a voice channel here, baka! ｡゜(｀Д´)゜｡');

		const { voiceChannel } = msg.member;

		if (!voiceChannel) return msg.reply('you have to be in a voice channel to add me, baka! ｡゜(｀Д´)゜｡');

		this.client.provider.set(msg.guild.id, 'voiceChannel', voiceChannel.id);
		this.client.voiceManager.joinVoice(voiceChannel);
		return msg.say(`Streaming to your server now, ${msg.author}-san! (* ^ ω ^)`);
	}
};
