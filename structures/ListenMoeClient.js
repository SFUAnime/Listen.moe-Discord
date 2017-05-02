const { CommandoClient } = require('discord.js-commando');
const https = require('https');
const winston = require('winston');

const VoiceManager = require('./VoiceManager');
const WebsocketManager = require('./WebsocketManager');
const Database = require('./PostgreSQL');
const Redis = require('./Redis');

function getStream(stream) {
	return new Promise(resolve => https.get(stream, res => resolve(res))
		.on('error', () => process.exit(1)));
}

module.exports = class ListenMoeClient extends CommandoClient {
	constructor(options) {
		super(options);
		this.radioInfo = {};
		this.customStream = false;

		this.websocketManager = new WebsocketManager(this);
		this.database = Database.db;
		this.redis = Redis.db;

		Database.start();
		Redis.start();

		getStream(options.stream).then(res => {
			const broadcast = this.createVoiceBroadcast();
			broadcast.playStream(res)
				.on('error', err => winston.error(`[DISCORD][SHARD: ${this.shard.id}] PLAYSTREAM ERROR VOICE CONNECTION: ${err.stack}`)); // eslint-disable-line max-len

			this.voiceManager = new VoiceManager(this, broadcast);
			this.voiceManager.setupGuilds();
		});
	}
};
