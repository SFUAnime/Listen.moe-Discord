const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			aliases: ['l'],
			group: 'listen',
			memberName: 'leave',
			description: 'Make the bot leave the voice channel.',
			guildOnly: true
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
	}

	run(msg) {
		if (!msg.guild.voiceConnection) return msg.reply('you didn\'t add me to a voice channel yet, baka! ｡゜(｀Д´)゜｡');

		this.client.provider.remove(msg.guild.id, 'voiceChannel');
		this.client.voiceManager.leaveVoice(msg.guild.voiceConnection);
		return msg.say(`I will stop streaming to your server now, ${msg.author}-san. (-ω-、)`);
	}
};
