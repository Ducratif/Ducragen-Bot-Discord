const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({ 
	intents: [		
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildWebhooks,
	],
});

module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		//await interaction.deferReply();

		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction, client);//client
		} catch (err) {
			//await interaction.editReply({ content: "🛠 | Une erreur s'est produite lors de l'exécution de cette commande.", ephemeral: true, }).catch(()=>{ });
			if (err) console.error(err);
		}
	}
}