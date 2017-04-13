const { oneLine } = require('common-tags');
const winston = require('winston');

const { radioChannels } = require('../config.json');

module.exports = class VoiceManager {
	constructor(client, broadcast) {
		this.client = client;
		this.broadcast = broadcast;

		this.purgeInteveral = setInterval(this.channelPurge.bind(this), 60 * 60 * 1000);
	}

	channelPurge() {
		for (const vc of this.client.voiceConnections.values()) {
			const vcListeners = vc.channel.members.filter(me => !(me.user.bot || me.selfDeaf || me.deaf)).size;
			if (vcListeners || radioChannels.includes(vc.channel.id)) continue;
			this.leaveVoice(vc);
			this.client.provider.remove(vc.channel.guild.id, 'voiceChannel');
		}
	}

	async setupGuilds() {
		const rows = await this.client.provider.db.all('SELECT CAST(guild as TEXT) as guild FROM settings');

		/* eslint-disable no-await-in-loop, max-len, id-length */
		for (const { guild: guildID } of rows) {
			const allGuildIDs = (await this.client.shard.broadcastEval('this.guilds.keyArray()')).reduce((prev, next) => prev.concat(next));

			if (!allGuildIDs.includes(guildID)) {
				await this.client.provider.clear(guildID);
				continue;
			}

			if (!this.client.guilds.has(guildID)) continue;

			this.setupGuild(guildID);

			await new Promise(r => setTimeout(r, 1000));
		}
		/* eslint-enable no-await-in-loop, max-len, id-length */
	}

	setupGuild(guildID) {
		const voiceChannelID = this.client.provider.get(guildID, 'voiceChannel');
		if (!voiceChannelID) return;
		const guild = this.client.guilds.get(guildID);
		const voiceChannel = guild.channels.get(voiceChannelID);
		if (!voiceChannel) return;
		const vcListeners = voiceChannel.members.filter(me => !(me.user.bot || me.selfDeaf || me.deaf)).size;
		if (!vcListeners && !radioChannels.includes(voiceChannel.id)) {
			winston.info(oneLine`
				[SHARD: ${this.client.shard.id}] REMOVED VOICE CONNECTION:
				For guild ${guild.name} (${guild.id}) DUE TO NO LISTENERS
			`);
			this.client.provider.remove(guild, 'voiceChannel');
			return;
		}

		this.joinVoice(voiceChannel);
	}

	async joinVoice(voiceChannel) {
		try {
			const voiceConnection = await voiceChannel.join();
			winston.info(oneLine`
				[SHARD: ${this.client.shard.id}] ADDED VOICE CONNECTION:
				(${voiceChannel.id}) for guild ${voiceChannel.guild.name} (${voiceChannel.guild.id})
			`);
			voiceConnection
				.playBroadcast(this.broadcast)
				.on('error', err => {
					winston.error(`[SHARD: ${this.client.shard.id}] PLAYBROADCAST ERROR VOICE CONNECTION: ${err.stack}`);
					this.client.provider.remove(voiceChannel.guild.id, 'voiceChannel');
					voiceConnection.disconnect();
				});
		} catch (error) {
			winston.error(oneLine`
				[SHARD: ${this.client.shard.id}] CATCH ERROR VOICE CONNECTION:
				(${voiceChannel.id}) for guild ${voiceChannel.guild.name} (${voiceChannel.guild.id}):
				${error.stack}
			`);
			await this.client.provider.remove(voiceChannel.guild.id, 'voiceChannel');
		}
	}

	leaveVoice(voiceConnection) {
		winston.info(oneLine`
			[SHARD: ${this.client.shard.id}] REMOVED VOICE CONNECTION:
			For guild ${voiceConnection.channel.guild.name} (${voiceConnection.channel.guild.id})
		`);
		voiceConnection.disconnect();
	}
};
