const { CommandoClient } = require('discord.js-commando');
const https = require('https');
const winston = require('winston');

const VoiceManager = require('./VoiceManager');
const WebsocketManager = require('./WebsocketManager');
const Database = require('./structures/PostgreSQL');
const Redis = require('./structures/Redis');

function getStream(stream) {
	return new Promise(resolve => https.get(stream, res => resolve(res))
		.on('error', () => process.exit(1)));
}

const database = new Database();
const redis = new Redis();

module.exports = class ListenMoeClient extends CommandoClient {
	constructor(options) {
		super(options);
		this.radioInfo = {};
		this.customStream = false;

		this.websocketManager = new WebsocketManager(this);
		this.database = database.db;
		this.redis = redis.db;

		database.start();
		redis.start();

		getStream(options.stream).then(res => {
			const broadcast = this.createVoiceBroadcast();
			broadcast.playStream(res)
				.on('error', err => winston.error(`[SHARD: ${this.shard.id}] PLAYSTREAM ERROR VOICE CONNECTION: ${err.stack}`));

			this.voiceManager = new VoiceManager(this, broadcast);
			this.voiceManager.setupGuilds();
		});
	}
};
