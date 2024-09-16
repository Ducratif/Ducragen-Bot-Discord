const { registerCommands } = require('../utils/registerAppCommands.js');

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`Connecté en tant que ${client.user.tag} sur ${client.guilds.cache.size} serveurs !`);
        client.user.setPresence({ activities: [{ name: '-help'}] });
        client.user.setActivity('Entrain de génère des comptes', { type: 'WATCHING' });

		client.guilds.cache.forEach(async guild => {
            const commands = (await guild.commands.fetch().catch(() => { })) || client.commands.size

            await registerCommands(client, guild);
            if (commands.size != client.commands.size) {
                await registerCommands(client, guild);
            }
        });
	},
};