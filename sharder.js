const { ShardingManager } = require('discord.js');
const path = require('path');

const { token } = require('./config');

const manager = new ShardingManager(path.join(__dirname, 'Listen.js'), { token });

manager.spawn(undefined, 1000);
