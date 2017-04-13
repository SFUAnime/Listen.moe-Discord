global.Promise = require('bluebird');

const { CommandoClient, FriendlyError } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const path = require('path');
const winston = require('winston');

const { owner, token } = require('./settings');

const client = new CommandoClient({
	owner,
	commandPrefix: '~~',
	unknownCommandResponse: false,
	disableEveryone: true
});

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
	return `User ${msg.author.tag} (${msg.author.id}) has been blacklisted.`;
});

client.on('error', winston.error)
	.on('warn', winston.warn)
	.once('ready', () => {})
	.on('ready', () =>
		winston.info(oneLine`
			Client ready...
			Logged in as ${client.user.tag}
			(${client.user.id})
		`)
	)
	.on('disconnect', () => winston.warn('Disconnected!'))
	.on('reconnect', () => winston.warn('Reconnecting...'))
	.on('commandRun', (cmd, promise, msg, args) => {
		winston.info(oneLine`${msg.author.tag} (${msg.author.id})
			> ${msg.guild ? `${msg.guild.name} (${msg.guild.id})` : 'DM'}
			>> ${cmd.groupID}:${cmd.memberName}
			${Object.values(args)[0] !== '' || [] ? `>>> ${Object.values(args)}` : ''}
		`);
	})
	.on('commandError', (cmd, err) => {
		if (err instanceof FriendlyError) return;
		winston.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		winston.info(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; User ${msg.author.tag} (${msg.author.id}): ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		winston.info(oneLine`
			Prefix changed to ${prefix || 'the default'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		winston.info(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		winston.info(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});

client.registry
	.registerGroups([
		['listen', 'Listen.moe']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);
