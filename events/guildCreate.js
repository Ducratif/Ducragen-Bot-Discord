const { registerCommands } = require('../utils/registerAppCommands.js');

module.exports = {
	name: "guildCreate",
	async execute(guild) {
		console.log(`Le BOT a rejoint le serveur: ${guild.name}`);
	
		client = guild.client;
        await registerCommands(client, guild);
	},
};