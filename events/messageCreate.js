module.exports = {
	name: "messageCreate",
	async execute(message) {
        const client = message.client;  

		if (message.author.bot || !message.guild) return;

	    if (!message.content.startsWith(client.prefix)) return;

	    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        const command = client.customCommands.get(cmd) || client.customCommands.find(command => command.aliases && command.aliases.includes(cmd));

	    if (!command) return;

        try {
            await command.execute(client, message, args);
        }
        catch (err) {
            await message.channel.send("🛠 | Une erreur s'est produite lors de l'exécution de cette commande.").catch(()=>{ });

            if (err) console.error(err);

            if (err.code == 50013) {	
				const author = await message.author;
				author.send(`Je n'ai pas l'autorisation d'envoyer un message au canal ${message.channel} sur le serveur **${message.guild}**`).catch(() => { })
			}
        }
	}
}