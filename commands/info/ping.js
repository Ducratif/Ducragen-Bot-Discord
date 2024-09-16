const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { Proposer_Par, Nom_Du_BOT } = require("../../config.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Obtenez le ping du bot'),
	async execute(interaction) {
		try {
			const mesg = await interaction.editReply({ content: "🏓 Pong!", fetchReply: true });
	  
			let embedModal = new EmbedBuilder()
				.setAuthor({ name: Nom_Du_BOT + " - Affiche le Ping" })
            	.setDescription(`❗️ **Latence du BOT** : \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`\n\n❗️ **Latence du Websocket** : \`${interaction.client.ws.ping}ms\`\n`)
				.setTimestamp()
				//.setImage(DucraGen_Logo)
				.setFooter({ text: `Proposer par ${Proposer_Par}` });
			await interaction.editReply({ embeds: [embedModal] });
		} catch (err) {
			await interaction.editReply("❌ | Quelque chose s'est mal passé");
			console.error(err);
		}
	},
};