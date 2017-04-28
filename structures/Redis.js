const bluebird = require('bluebird');
const redisClient = require('redis');
const winston = require('winston');

bluebird.promisifyAll(redisClient.RedisClient.prototype);
bluebird.promisifyAll(redisClient.Multi.prototype);

const redis = redisClient.createClient({ db: 3 });

class Redis {
	get db() {
		return redis;
	}

	start() {
		redis.on('error', error => winston.error(`[REDIS]: Encountered error: \n${error}`))
			.on('reconnecting', () => winston.warn('[REDIS]: Reconnecting...'));
	}
}

module.exports = Redis;
